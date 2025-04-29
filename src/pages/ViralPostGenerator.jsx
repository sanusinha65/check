import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { motion } from 'framer-motion';

function Banner() {
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
            Viral Post Generator
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
            Use AI to write the perfect LinkedIn post
          </motion.p>

          <motion.div 
                className="flex flex-col min-w-full sm:min-w-[24rem] md:min-w-[32rem] lg:min-w-[40rem] justify-center items-center gap-4 px-4 py-6 border border-gray-300 rounded-md shadow-lg"
                variants={itemVariants}
            >
                <div className="flex flex-col w-full">
                    <label htmlFor="urlInput" className="text-gray-600 font-semibold mb-2">What did you do today?</label>
                    <input
                        id="urlInput"
                        type="text"
                        placeholder="I started a new job, I got a promotion, etc."
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="flex flex-col w-full mt-4 sm:mt-0">
                    <label htmlFor="otherInput" className="text-gray-600 font-semibold mb-2">Inspirational Advice</label>
                    <input
                        id="otherInput"
                        type="text"
                        placeholder="Shoot for the stars"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="flex flex-col w-full mt-4 sm:mt-0">
                    <label htmlFor="otherInput" className="text-gray-600 font-semibold mb-2">Cringe Level</label>
                    <select
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <button
                    className="px-6 py-3 bg-gradient-to-r self-end from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:opacity-90 transition mt-4 sm:mt-0"
                >
                   Write a post
                </button>
            </motion.div>

          
        </motion.div>
      </section>
    );
}

function ViralPostGenerator()
{
  return (
    <>
    <Header/>
    <Banner/>
    <Footer/>
    </>
  )
}

export default ViralPostGenerator