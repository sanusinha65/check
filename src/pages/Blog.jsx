import React from 'react'
import Header from '../components/Header'
import Footer from "../components/Footer"
import BlogLayout from '../components/BlogLayout'
import Meta from "../helper/Meta"

function Blog() {
  return (
    <>
    <Meta 
      title="Outx.ai Blog - LinkedIn Growth, Scraping & Outreach Tips" 
      description="Learn proven LinkedIn scraping, tracking, and outreach strategies to supercharge your growth." 
      keywords="LinkedIn scraping blog, LinkedIn growth tips, LinkedIn tracking blog" 
    />
    <Header/>
    <div className='w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 py-20 lg:py-10 md:py-6'>
        <h3 className='text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold lg:leading-18 text-center lg:mt-20 sm:mt-30 mb-10'>Growth, Sales & LinkedIn Insights—All in One Place</h3>
        <BlogLayout/>
    </div>
    <Footer/>
    </>
  )
}

export default Blog