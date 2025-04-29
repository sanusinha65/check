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
import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import Stats from '../components/Stats';
import Meta from '../helper/Meta';

const PricingCard = ({ title, subtitle, price, features, mostPopular }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative p-8 rounded-2xl shadow-xl ${mostPopular ? 'bg-gradient-to-b from-purple-50 to-white border-2 border-purple-500' : 'bg-white border border-gray-200'} w-full`}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 } 
      }}
    >
      {mostPopular && (
        <motion.div 
          className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Most Popular
        </motion.div>
      )}
      
      <h2 className="text-2xl font-bold mb-2 text-purple-700">{title}</h2>
      <p className='text-gray-600 mb-4 h-12'>{subtitle}</p>
      
      {price ? (
        <div className="mb-6">
          <motion.p 
            className="text-4xl font-bold text-purple-700"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ${price} <span className="text-lg font-normal text-gray-600">/month</span>
          </motion.p>
          <p className="text-sm text-gray-500 mt-1">Billed monthly or annually</p>
        </div>
      ) : (
        <div className="mb-6">
          <motion.p 
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Custom
          </motion.p>
          <p className="text-sm text-gray-500 mt-1">Contact us for pricing</p>
        </div>
      )}
      
      <motion.button 
        className={`w-full py-3 px-6 rounded-lg ${mostPopular ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'} font-medium transition-all mb-6 flex items-center justify-center`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Get Started
        <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
      </motion.button>
      
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
      
      <h3 className="font-medium text-gray-700 mb-4">Features include:</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <motion.li 
            key={index} 
            className="flex items-start space-x-3 text-gray-700"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
          >
            <div className="p-1 bg-green-100 rounded-full mt-0.5">
              <FontAwesomeIcon icon={faCheck} className="text-green-600 text-xs" />
            </div>
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

function KeywordTrackerPricing() {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    {
      title: "Individual",
      subtitle: "Ideal for tracking a small brand",
      price: 99,
      features: ["3 keywords", "2K mentions / mo", "1 user", "Update every 12h", "AI Sentiment Analysis"],
    },
    {
      title: "Pro",
      subtitle: "Ideal for growing businesses and small agencies",
      price: 199,
      mostPopular: true,
      features: [
        "20 keywords", "40K mentions / mo", "Unlimited users", "Realtime updates", "Priority support",
        "AI Sentiment Analysis", "AI Events Detection", "AI Brand Assistant", "AI Insights (for 2 projects)",
        "AI Topics (for 2 projects)"
      ],
    },
    {
      title: "Business",
      subtitle: "Ideal for growing businesses and small agencies",
      price: 299,
      features: ["50 keywords", "100K mentions / mo", "Unlimited users", "Realtime updates", "Priority support",
        "AI Sentiment Analysis", "AI Events Detection", "AI Brand Assistant", "AI Insights (for 2 projects)",
        "AI Topics (for 2 projects)"],
    },
    {
      title: "Enterprise",
      subtitle: "Ideal for industry leaders and large-scale enterprises",
      price: null,
      features: [
        "Unlimited keywords", "Unlimited mentions", "Unlimited users", "Realtime update", "Priority support",
        "AI Sentiment Analysis", "AI Events Detection", "AI Brand Assistant", "Unlimited AI Insights",
        "Unlimited AI Topics", "AI Emotion Analysis", "Client Success Lead", "Advanced Reports", "Dedicated consulting"
      ],
    },
  ];

  return (
    <>
      <Meta 
      title="LinkedIn Keyword Tracker Pricing - Outx.ai" 
      description="Track more LinkedIn keywords with flexible monthly plans. Start tracking leads and conversations today." 
      keywords="LinkedIn tracker pricing, keyword monitoring plans, LinkedIn monitoring cost" 
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
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Find Your Perfect Plan
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Try our free 14-day trial with all features unlocked. No credit card required.
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center mt-8 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center bg-white rounded-full shadow-md p-1 border border-gray-200">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-2 rounded-full transition-all ${!isYearly ? 'bg-purple-600 text-white shadow-md' : 'text-gray-700'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-2 rounded-full transition-all flex items-center ${isYearly ? 'bg-purple-600 text-white shadow-md' : 'text-gray-700'}`}
                >
                  Yearly
                  <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Pricing Cards */}
          <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard 
                key={index} 
                {...plan} 
                price={plan.price ? (isYearly ? Math.round(plan.price * 0.8) : plan.price) : null}
              />
            ))}
          </div>
          
          {/* Trust Badges Section */}
          <motion.div 
            className="mt-32 text-center"
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
              Trusted by Industry Leaders
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join 30,000+ businesses that use OutX to scale outbound sales and drive new revenue
            </motion.p>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl max-w-5xl mx-auto border border-gray-100 mb-20"
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
            
            {/* Testimonials Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
              <motion.div 
                className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-xl border border-purple-100 text-left relative overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-indigo-300/20 rounded-full blur-xl"></div>
                
                <div className="flex justify-start gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div 
                      key={star}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + (star * 0.1) }}
                    >
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-2xl" />
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-lg font-medium text-gray-800 mb-4 italic">
                  "OutX has transformed our LinkedIn prospecting strategy completely. The keyword tracking helps us identify and engage with prospects at just the right moment."
                </div>
                
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                    JD
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">John Doe</p>
                    <p className="text-gray-600">Sales Director, Enterprise Company</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl border border-blue-100 text-left relative overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"></div>
                
                <div className="flex justify-start gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div 
                      key={star}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + (star * 0.1) }}
                    >
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-2xl" />
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-lg font-medium text-gray-800 mb-4 italic">
                  "It's been a game-changer for our sales team's efficiency and conversion rates. We're seeing 3x more qualified opportunities since implementing OutX."
                </div>
                
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                    SJ
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">Sarah Johnson</p>
                    <p className="text-gray-600">Marketing Lead, Tech Innovators</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Chrome Store Rating */}
            <motion.div 
              className="bg-gradient-to-br from-purple-600 to-indigo-600 p-10 rounded-2xl shadow-xl max-w-3xl mx-auto mb-20 text-white"
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
            
            {/* Final CTA */}
            <motion.div 
              className="bg-white p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-gray-200 mb-12 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-xl"></div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Start Using The Best LinkedIn Keyword Tracker Today
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Don't miss another opportunity. Start tracking your keywords and convert conversations into customers.
              </motion.p>
              
              <motion.button 
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)" 
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Start Your Free 14-Day Trial
              </motion.button>
              
              <motion.p 
                className="text-gray-500 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                No credit card required. Cancel anytime.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}

export default KeywordTrackerPricing;