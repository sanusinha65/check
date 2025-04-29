import fs from 'node:fs/promises'
import express from 'express'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.js').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url)

    // Collect CSS files
    const cssFiles = [
      '/src/index.css',
      '/src/App.css',
      '/node_modules/@fortawesome/fontawesome-free/css/all.min.css'
    ]

    let cssContent = ''
    if (!isProduction) {
      // In development, use Vite to transform CSS
      for (const file of cssFiles) {
        const css = await vite.transformIndexHtml(url, `<link rel="stylesheet" href="${file}">`)
        cssContent += css
      }
    } else {
      // In production, read from dist
      for (const file of cssFiles) {
        try {
          const css = await fs.readFile(`./dist/client${file}`, 'utf-8')
          cssContent += `<style>${css}</style>`
        } catch (e) {
          console.error(`Error reading CSS file ${file}:`, e)
        }
      }
    }

    const html = template
      .replace(`<!--app-head-->`, `${cssContent}${rendered.head ?? ''}`)
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})