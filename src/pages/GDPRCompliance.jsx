import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from 'react-router-dom';
import Stars from "../assets/stars.svg"
import Meta from "../helper/Meta"

function GDPRCompliance() {
  const gdprfeatures = [
    {
      icon: "fa-play-circle",
      title: "Live Extraction",
      description: "All the data is extracted live on the web by the OutX scraping algorithm."
    },
    {
      icon: "fa-envelope-circle-check",
      title: "No personal emails",
      description: "We only provide professional emails that are GDPR compliant for prospecting."
    },
    {
      icon: "fa-database",
      title: "No Database",
      description: "We don't store the data we extract on websites to resell it to our users."
    }
  ];

  const reasons = [
    {
      icon: "fa-heart-circle-plus",
      title: "Legitimate Interest",
      description: "Prove there is a legitimate interest for the person who is being contacted.",
    },
    {
      icon: "fa-file-contract",
      title: "Contract",
      description: "Personal data is required for performance of a contract with the data subject.",
    },
    {
      icon: "fa-scale-balanced",
      title: "Compliance",
      description: "Necessary for compliance with a legal obligation.",
    },
    {
      icon: "fa-building-columns",
      title: "Vital Interest",
      description: "For state-run bodies where access to personal data is in the public's interest.",
    },
    {
      icon: "fa-square-check",
      title: "Consent",
      description: "The person whose data you have consented to you having their data.",
    },
  ];

  const features = [
    {
      icon: "fas fa-shield-alt",
      title: "Safe",
      description:
        "Make sure your account never goes above the scraping limitations set by LinkedIn.",
      button: { text: "Learn more", link: "/" },
    },
    {
      icon: "fas fa-users",
      title: "Scalable",
      description:
        "Connect all your Sales Navigator accounts and collaborate with your team.",
      button: { text: "Learn more", link: "/" },
    },
    {
      icon: "fas fa-cloud",
      title: "Privacy",
      description:
        "Check our Privacy Policy to see what OutX does with the data and how it is used.",
      button: { text: "Privacy Policy", link: "/privacy-policy" },
    },
  ];

  return (
    <>
      <Meta 
        title="Outx.ai GDPR Compliance" 
        description="See how Outx.ai complies with GDPR while helping you grow through LinkedIn scraping and tracking." 
        keywords="GDPR compliant LinkedIn scraper, Outx.ai GDPR, LinkedIn GDPR scraping" 
      />
      <Header />
      <div className="w-full max-w-[1800px] py-20 text-center mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 lg:py-20 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold lg:leading-18 lg:pt-10 pt-4">GDPR Compliant Linkedin Sales Navigator Scraper</h1>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 pt-4">OutX respects all the constraints imposed to web scrapers to be considered GDPR compliant</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 lg:py-10 py-4">
          {gdprfeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center min-h-[250px]"
            >
              <div className="flex justify-center items-center">
                <div className="bg-[#6241D3] text-white p-4 rounded-full text-4xl">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2 lg:text-xl">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 py-12 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">The 5 Legitimate Reasons of Web Scraping</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:px-10">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col items-center lg:py-10">
                <i className={`fa-solid ${reason.icon} text-[#6241D3] text-3xl mb-3`}></i>
                <h3 className="font-semibold text-lg">{reason.title}</h3>
                <p className="text-sm text-gray-700 mt-2 lg:p-0 px-2">{reason.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-white text-black mt-8 p-6 rounded-lg lg:mx-10 mx-4">
            <p className="font-bold text-lg lg:text-xl">
              GDPR compliance of B2B prospecting is based on Legitimate Interest.
            </p>
            <p className="text-sm mt-2 lg:text-lg">
              B2B Prospecting is GDPR compliant as long as you gather B2B info to contact people on their pro emails to
              offer them a product or a service that can bring value to their activity.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center"
          >
            <i className={`${feature.icon} text-6xl text-[#6241D3] mb-4`}></i>
            <h3 className="text-2xl font-bold mb-2 lg:text-3xl">{feature.title}</h3>
            <p className="text-gray-600 mb-4 lg:text-xl">{feature.description}</p>
            <Link
              to={feature.button.link}
              className="bg-[#6241D3] text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition"
            >
              {feature.button.text} →
            </Link>
          </div>
        ))}
        </div>
        <h4 className='text-2xl font-extrabold lg:text-7xl lg:pt-10'>Start Using The Best Sales Navigator Extractor</h4>
        <p className='text-xl lg:pt-6 lg:text-2xl'>Join 50,000+ people saving time with OutX</p>
        <div className='text-center mt-4 sm:mt-6'>
                <p className='flex items-center justify-center gap-x-2'>
                  <img src={Stars} alt="star" height={20} width={20}/>
                  <img src={Stars} alt="star" height={20} width={20}/>
                  <img src={Stars} alt="star" height={20} width={20}/>
                  <img src={Stars} alt="star" height={20} width={20}/>
                  <img src={Stars} alt="star" height={20} width={20}/>
                </p>
                <p className='text-sm sm:text-base md:text-lg'>4.6 / 5 rating by G2 users</p>
        </div>
        <div className="bg-gradient-to-t from-[#aaa9a9] via-[#ece4e4] to-[#ece4e4] px-6 md:px-12 lg:px-32 py-20 my-10 rounded-lg text-center overflow-hidden">
          <h2 className="text-3xl md:text-4xl lg:text-5xl py-5 font-extrabold text-black">
          Download Your First Leads Now
          </h2>
          <button className='bg-white px-10 text-xl font-bold cursor-pointer py-3 rounded-md mt-4'>Export your list</button>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default GDPRCompliance