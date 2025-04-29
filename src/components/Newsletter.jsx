import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Newsletter = ({ data }) => {
  const features = [
    "20 free credits",
    "No credit card required",
    "Works with LinkedIn",
    "14 days free Trial"
  ];

  return (
    <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 mt-10 mb-20">
      <motion.div 
        className="relative overflow-hidden rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-indigo-700/90 z-0"></div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white opacity-10"
            animate={{ 
              x: [0, 10, 0], 
              y: [0, 15, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10,
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white opacity-10"
            animate={{ 
              x: [0, -15, 0], 
              y: [0, -10, 0],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 12,
              ease: "easeInOut" 
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center py-20 lg:px-10 px-6">
          <motion.h2 
            className="font-bold text-3xl md:text-4xl leading-tight mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {data.heading}
          </motion.h2>
          
          <motion.p 
            className="text-purple-100 mt-2 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {data.subheading}
          </motion.p>

          {data.cta && (
            <motion.div 
              className="my-10 flex flex-col md:flex-row justify-center gap-4 md:gap-0 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {data.workEmail && (
                <motion.input
                  type="email"
                  placeholder="Work email"
                  className="px-6 py-4 rounded-md md:rounded-l-md md:rounded-r-none focus:outline-none bg-white/95 w-full md:w-auto shadow-inner border-0 text-gray-700"
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3)" }}
                />
              )}
              
              <Link to="/register">
                <motion.button 
                  className="bg-white text-[#6241D3] font-medium px-6 py-4 rounded-md md:rounded-r-md md:rounded-l-none hover:bg-purple-50 cursor-pointer shadow-lg w-full md:w-auto"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {data.cta}
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* Features */}
          {data.features && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.4 }
                }
              }}
            >
              {features.map((text, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-center gap-x-2 bg-white/10 backdrop-blur-sm rounded-lg py-3 px-4 text-white"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-purple-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 + index * 0.1 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                  <span className="font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Newsletter;