import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Microsoft from "../assets/microsoft.png";
import Google from "../assets/google.png";
import Slack from "../assets/slack.png";
import Teradata from "../assets/teradata.svg";
import MixpanelService from '../utils/mixpanel';

function Banner({ data }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  // Animation for floating elements
  const floatingAnimation = {
    y: [0, -10, 0],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-50 via-white to-blue-50"></div>
        
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-300/30 filter blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-blue-300/30 filter blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </motion.div>
      </div>
      
      
      {/* Main content */}
      <motion.div 
        className='relative z-10 flex flex-col items-center justify-center w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 py-20 lg:py-28'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold lg:leading-18 text-center mt-10 sm:mt-30 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-600'
          variants={itemVariants}
        >
          {data.heading}
          <motion.div 
            className="h-1 w-24 sm:w-40 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "40%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.h1>
        
        <motion.p 
          className='text-base sm:text-lg md:text-xl lg:text-2xl text-center lg:leading-10 sm:leading-8 lg:my-8 my-8 max-w-4xl text-gray-700'
          variants={itemVariants}
        >
          {data.subheading}
          {data.para}
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Link to="/register">
            <motion.div className="relative inline-block" onClick={() => MixpanelService.trackCTA("get_started_for_free")}>
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30"
                animate={{ opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.button 
                className="relative px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg md:text-xl rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                Get started for free →
              </motion.button>
            </motion.div>
          </Link>
        </motion.div>
        
        <motion.p 
          className='text-base sm:text-lg text-center text-gray-600 mb-4 mt-8'
          variants={itemVariants}
        >
          Trusted by <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600">30,000+</span> businesses to scale outbound sales
        </motion.p>
        
        <motion.div
          className='flex flex-wrap gap-8 lg:gap-12 mt-4 items-center justify-center mb-8'
          variants={itemVariants}
        >
          {[
            { src: Microsoft, alt: "microsoft", className: "lg:w-32 md:w-28 w-20" },
            { src: Google, alt: "google", className: "lg:w-32 md:w-28 w-20" },
            { src: Slack, alt: "slack", className: "lg:w-32 md:w-28 w-20" },
            { src: Teradata, alt: "teradata", className: "lg:w-32 md:w-28 w-20" }
          ].map((logo, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.2 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img 
                src={logo.src}
                alt={logo.alt}
                height={"auto"}
                className={`${logo.className} relative z-10 opacity-70 transition-all duration-300 grayscale hover:grayscale-0 hover:opacity-100`}
                whileHover={{ y: -5 }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className='text-center mt-10 bg-white/70 backdrop-blur-sm py-5 px-10 rounded-xl shadow-md'
          variants={itemVariants}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(99, 102, 241, 0.15)",
            background: "rgba(255, 255, 255, 0.85)"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div className='flex items-center justify-center gap-x-2 mb-3'>
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.5 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-2xl drop-shadow-sm' />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <p className='text-sm sm:text-base md:text-lg font-medium text-gray-800'>
            5/5 rating on the Chrome Web Store
          </p>
        </motion.div>
        
        {/* Scroll indicator
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
            <FontAwesomeIcon icon={faChevronDown} className="text-purple-500 text-xl" />
          </motion.div>
        </motion.div> */}
      </motion.div>
    </section>
  );
}

export default Banner;