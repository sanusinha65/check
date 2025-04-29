import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Google from "../assets/google.png";
import Microsoft from "../assets/microsoft.png";
import Salesforce from "../assets/salesforce.png";
import Slack from "../assets/slack.png";
import Stars from "../assets/stars.svg";
import Teradata from "../assets/teradata.svg";
import UserTesting from "../assets/user_testing.svg";
import Newsletter from '../components/Newsletter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowRight, faBolt, faEnvelope, faCreditCard, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import Stats from '../components/Stats';
import { Link } from 'react-router-dom';
import Meta from '../helper/Meta';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [credits, setCredits] = useState(10000);

  // Pricing data
  const pricing = {
    10000: { monthly: 99, yearly: 68 },
    5000: { monthly: 59, yearly: 41 },
    500: { monthly: 19, yearly: 13 },
    1000: { monthly: 29, yearly: 20 },
    2000: { monthly: 39, yearly: 27 },
    20000: { monthly: 179, yearly: 124 },
    40000: { monthly: 299, yearly: 206 },
    80000: { monthly: 499, yearly: 344 },
    100000: { monthly: 589, yearly: 406 }
  };

  const features = [
    "Export leads", 
    "Export accounts", 
    "Find emails", 
    "Verify emails", 
    "Clean data", 
    "Filter leads", 
    "Unlimited seats", 
    "Unlimited SN accounts", 
    "Credits rollover"
  ];

  const statsData = {
    heading: "Download your First Lead List Today!",
    subheading: "Install OutX.ai Chrome Extension – Free!",
    stats: false,
    cta: true
  };

  const creditOptions = Object.keys(pricing).sort((a, b) => Number(a) - Number(b));

  return (
    <>
      <Meta 
      title="LinkedIn Sales Navigator Scraper Pricing - Outx.ai" 
      description="Affordable plans to export unlimited LinkedIn Sales Navigator leads. Choose the plan that fits your growth." 
      keywords="LinkedIn scraping pricing, Sales Navigator export pricing, LinkedIn scraper cost" 
    />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50/30"></div>
          <motion.div 
            className="absolute top-40 right-10 w-96 h-96 rounded-full bg-purple-200/40 filter blur-3xl"
            animate={{ 
              x: [0, -30, 0], 
              y: [0, -20, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-200/40 filter blur-3xl"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, 20, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600"
              variants={itemVariants}
            >
              Build Email Lists in Seconds, Not Hours
            </motion.h1>
            
            <motion.div className="max-w-xl mx-auto mb-12" variants={itemVariants}>
              <motion.div 
                className="bg-white rounded-full p-1.5 shadow-md border border-gray-200 inline-flex items-center"
                whileHover={{ boxShadow: "0 10px 25px rgba(99, 102, 241, 0.1)" }}
              >
                <span 
                  className={`px-6 py-2 rounded-full text-base font-medium transition-all ${!isYearly ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-700'}`}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </span>
                <span 
                  className={`px-6 py-2 rounded-full text-base font-medium transition-all flex items-center ${isYearly ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-700'}`}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly
                  <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    Save 17%
                  </span>
                </span>
              </motion.div>
            </motion.div>
            
            {/* Pricing Card */}
            <motion.div 
              className="max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100 relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 25px 50px rgba(139, 92, 246, 0.15)",
                  transition: { duration: 0.4 } 
                }}
              >
                {/* Pricing Header */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 border-b border-purple-100">
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="text-6xl font-bold text-purple-600 flex items-baseline mb-2"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.5 }}
                    >
                      ${isYearly ? pricing[credits].yearly : pricing[credits].monthly}
                      <span className="text-xl text-purple-400 ml-1">/mo</span>
                    </motion.div>
                    <p className="text-gray-600">Billed {isYearly ? 'annually' : 'monthly'}</p>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="p-8">
                  {/* CTA Button */}
                  <Link to="/register">
                  <motion.button 
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-md mb-6 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Try OutX Now
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </motion.button>
                  </Link>

                  {/* Credit Info */}
                  <div className="bg-purple-50 rounded-lg p-4 mb-6">
                    <p className="text-lg text-gray-800 font-medium mb-1">
                      <FontAwesomeIcon icon={faEnvelope} className="text-purple-600 mr-2" />
                      1 lead or account exported = 1 credit
                    </p>
                    <p className="text-lg text-gray-800 font-medium mb-1">
                      <FontAwesomeIcon icon={faEnvelope} className="text-purple-600 mr-2" />
                      1 email found = 1 credit
                    </p>
                    <p className="text-sm text-gray-600 ml-6">
                      (1 lead exported with email = 2 credits)
                    </p>
                  </div>
                  
                  {/* Credit Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select your monthly credits:
                    </label>
                    <div className="relative">
                      <select
                        className="w-full p-3 text-lg font-bold border border-purple-200 rounded-lg text-purple-700 bg-white appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        value={credits}
                        onChange={(e) => setCredits(Number(e.target.value))}
                      >
                        {creditOptions.map((credit) => (
                          <option key={credit} value={credit}>
                            {Number(credit).toLocaleString()} credits/month
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <motion.div 
                        key={feature} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                      >
                        <div className="p-1 bg-green-100 rounded-full mr-2">
                          <FontAwesomeIcon icon={faCheck} className="text-green-600 text-xs" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 text-center">
                    VAT may apply if you are based in Europe.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Benefits Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faBolt} className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Extract thousands of leads from LinkedIn Sales Navigator in seconds, not hours.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Finder</h3>
              <p className="text-gray-600">
                Find and verify business emails with our powerful email finder technology.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Unlimited Seats</h3>
              <p className="text-gray-600">
                Share your subscription with your entire team at no extra cost.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Trust Section */}
          <motion.div 
            className="text-center mt-24 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto mb-4 flex items-center justify-center">
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-purple-600"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The Best Sales Navigator Extractor
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by 30,000+ businesses to scale outbound sales and drive new revenue
            </motion.p>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl max-w-5xl mx-auto border border-gray-100 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="flex justify-center"
                >
                  <img src={Microsoft} alt="Microsoft" className="h-12 w-auto" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="flex justify-center"
                >
                  <img src={Google} alt="Google" className="h-10 w-auto" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="flex justify-center"
                >
                  <img src={Slack} alt="Slack" className="h-10 w-auto" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="flex justify-center"
                >
                  <img src={Teradata} alt="Teradata" className="h-10 w-auto" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Rating Card */}
            <motion.div 
              className="bg-gradient-to-br from-purple-600 to-indigo-600 p-10 rounded-2xl shadow-xl max-w-3xl mx-auto mb-16 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div 
                className="flex justify-center gap-2 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ opacity: 0, y: 10, rotate: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + (star * 0.1), type: "spring" }}
                  >
                    <FontAwesomeIcon icon={faStar} className="text-yellow-300 text-4xl" />
                  </motion.div>
                ))}
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">5/5 rating on the Chrome Web Store</h3>
              <p className="text-white/80 max-w-xl mx-auto">
                Join thousands of happy users who have rated our Chrome extension with a perfect score
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Stats statsData={statsData}/>
      <Footer />
    </>
  );
}

export default PricingPage;