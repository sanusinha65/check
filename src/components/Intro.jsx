import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MixpanelService from '../utils/mixpanel';

function Intro({ title, description, steps, buttonText, buttonLink, subtext }) {
  return (
    <section className="relative text-center w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 py-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-purple-200/30 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-200/30 filter blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h3 
          className="font-bold text-3xl md:text-4xl leading-tight mb-4 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-700 text-lg max-w-3xl mx-auto mt-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-500/10 to-blue-500/5 backdrop-blur-sm p-8 rounded-xl shadow-md border border-white/20 flex flex-col items-center h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 } 
              }}
            >
              <motion.div 
                className="text-purple-600 text-3xl p-3 bg-white rounded-lg shadow-sm mb-4 mx-auto"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="font-bold">{index + 1}</span>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold mb-3 text-center w-full text-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-700 text-center w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {(buttonText && buttonLink) && (
          <motion.div
            className="flex flex-col items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to={buttonLink}>
              <motion.div className="relative inline-block" onClick={() => {
                const formattedText = buttonText
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '') 
                .trim()
                .split(/\s+/)
                .join('_');
              
              MixpanelService.trackCTA(`${formattedText}`);
              }}>
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.button 
                  className="relative px-10 py-4 text-base sm:text-lg rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {buttonText}
                </motion.button>
              </motion.div>
            </Link>
            {subtext && (
              <motion.p 
                className="text-gray-500 text-sm md:text-base mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {subtext}
              </motion.p>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default Intro;