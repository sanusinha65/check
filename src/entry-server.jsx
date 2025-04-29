import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './redux/slices/userSlice';
import './index.css';
import './App.css';

/**
 * @param {string} url
 */
export async function render(url, context) {
  try {
    // If the URL is a full URL, extract just the path
    if (url.startsWith('http')) {
      try {
        const urlObj = new URL(url);
        url = urlObj.pathname;
      } catch (e) {
        // If URL parsing fails, use the original URL
        console.error('Error parsing URL:', e);
      }
    }

    // Ensure URL is properly formatted
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    
    // Remove trailing slash except for root
    if (url !== '/' && url.endsWith('/')) {
      url = url.slice(0, -1);
    }

    // Sanitize the URL to ensure it's a valid path
    url = url.split('?')[0]; // Remove query parameters
    url = url.split('#')[0]; // Remove hash fragments

    // Ensure the URL is properly encoded
    url = encodeURI(url);

    console.log('Final URL:', url); // Debug log

    const rootReducer = (state = {}, action) => ({
      user: userReducer(state.user, action)
    });

    const store = createStore(rootReducer, applyMiddleware(thunk));

    const app = (
      <StrictMode>
        <Provider store={store}>
          <StaticRouter location={url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </StrictMode>
    );

    const html = renderToString(app);
    
    return { 
      html,
      head: '' // We'll handle CSS in the server.js file
    };
  } catch (error) {
    console.error('Error in render function:', error);
    throw error;
  }
}
