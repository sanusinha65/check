import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Google from "../assets/google.png"
import Microsoft from "../assets/microsoft.png"
import Salesforce from "../assets/salesforce.png"
import Slack from "../assets/slack.png"
import Stars from "../assets/stars.svg"
import Teradata from "../assets/teradata.svg"
import UserTesting from "../assets/user_testing.svg"
import Accordion from './Accordion'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function AffiliateProgram() {
  return (
    <>
    <Header/>
    <div className='flex flex-col items-center justify-center h-full w-full max-w-[1800px]  mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 py-12 lg:py-2 sm:py-16'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold lg:leading-18 text-center mt-10 sm:mt-30'>
      Qodex Affiliate Program
      </h1>
      <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-center lg:leading-10 sm:leading-8 my-2'>
      Earn commissions by promoting Qodex – the leading AI-powered API testing platform!
      </p>
      {/* <Link to="/register"><button className='px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg md:text-xl rounded-md bg-black text-white mb-4 sm:mb-6'>
        Become an Affiliate
      </button>
      </Link> */}
      <div className='py-12 lg:py-14 sm:py-16 flex flex-col gap-y-8'>
        <div className='flex flex-col gap-y-4'>
          <h4 className='font-bold text-lg lg:text-3xl'>How It Works</h4>
          <p className='lg:text-md'>Joining the Qodex Affiliate Program is simple. Share Qodex with your audience and earn commissions for every successful transaction through your referral link. Promote Qodex through blog posts, banners, emails, social media, or any other content of your choice.</p></div>
        <div className='flex flex-col gap-y-4'>
          <h4 className='font-bold text-lg lg:text-3xl'>Why Join the Qodex Affiliate Program?</h4>
          <ul className='lg:text-md list-disc list-inside'>
            <li>Partner with a High-Growth AI Startup – Be part of an innovative AI-driven API testing platform.</li>
            <li>15% Monthly Recurring Commission – Earn continuous passive income for every referral.</li>
            <li>90-Day Cookie Tracking – Get credit for purchases made within 90 days of clicking your link.</li>
            <li>Ideal for Individuals & Enterprises – Perfect for developers, testers, influencers, and tech bloggers.</li>
          </ul>
          <h4 className='font-bold text-lg lg:text-3xl'>How to Get Started?</h4>
          <ol className='lg:text-md list-decimal list-inside'>
            <li>Sign Up – Join our affiliate program for free.</li>
            <li>Promote Qodex – Use your unique referral link to share Qodex with your audience.</li>
            <li>Earn Commissions – Get paid for every successful transaction.</li>
          </ol>
          <h4 className='font-bold text-lg lg:text-3xl'>Ready to start earning?</h4>
          <div>
          <Link to="/register" className='text-[#6241D3] border-b border-[#6241D3]'>Join the Qodex Affiliate Program</Link>
          <p className='text-base sm:text-lg md:text-xl text-center mt-4'>
        Trusted by 30,000+ businesses to scale outbound sales and drive new revenue
      </p>
      <div className='flex flex-wrap gap-x-2 lg:gap-x-6 mt-2 items-center justify-center text-base sm:text-lg md:text-xl font-bold'>
        <img src={Microsoft} alt="microsoft" height={"auto"}  className='lg:w-40 md:w-30 w-20'/>
        <img src={Google} alt="google" height={"auto"}  className='lg:w-40 md:w-30 w-20'/>
        <img src={Slack} alt="slack" height={"auto"}  className='lg:w-40 md:w-30 w-20'/>
        <img src={Teradata} alt="teradata" height={"auto"}  className='lg:w-40 md:w-30 w-20' />
        {/* <img src={UserTesting} alt="usertesting" height={"auto"}  className='lg:w-40 md:w-30 w-20'/>
        <img src={Salesforce} alt="salesforce" height={"auto"}  className='lg:w-40 md:w-30 w-20'/> */}
      </div>
      <div className='text-center mt-4 sm:mt-6'>
        <p className='flex items-center justify-center gap-x-2 mb-2'>
          <FontAwesomeIcon icon={faStar} className='text-[#6241D3] text-2xl'/>
          <FontAwesomeIcon icon={faStar} className='text-[#6241D3] text-2xl'/>
          <FontAwesomeIcon icon={faStar} className='text-[#6241D3] text-2xl'/>
          <FontAwesomeIcon icon={faStar} className='text-[#6241D3] text-2xl'/>
          <FontAwesomeIcon icon={faStar} className='text-[#6241D3] text-2xl'/>
        </p>
        <p className='text-sm sm:text-base md:text-lg'>5/5 rating on the Chrome Web Store</p>
      </div>
          </div>
        </div>
      </div>
      <Accordion/>
    </div>
    <Footer/>
    </>
  )
}

export default AffiliateProgram