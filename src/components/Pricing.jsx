import React from 'react';
import { motion } from 'framer-motion';

const Pricing = ({ 
  pricingData,
  onCtaClick = () => {}
}) => {
  // Destructure the pricing data with fallback defaults if needed
  const {
    title,
    subtitle,
    ctaText,
    ctaSubtext,
    items = []
  } = pricingData || {};
  // Animation variants for staggered children
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

  const barVariants = {
    hidden: { width: 0 },
    visible: (width) => ({ 
      width, 
      transition: { duration: 1.2, ease: "easeOut" } 
    })
  };

  return (
    <section className="relative py-24 overflow-hidden">
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

      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 relative">
        <motion.div 
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header section */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.div
              className="inline-block mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
              </div>
            </motion.div>
            
            <motion.h2 
              className="font-bold text-4xl md:text-5xl leading-tight mb-6"
              variants={itemVariants}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">
                {title}
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-xl mx-auto mb-2"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
            
            <motion.div 
              className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-8 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Pricing comparison card */}
          <motion.div 
            className="max-w-5xl mx-auto"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Card header */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-6 px-8 border-b border-gray-100">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 text-sm md:text-base font-medium text-gray-600">
                  <div>Service Provider</div>
                  <div className="hidden md:block">Price Comparison</div>
                  <div className="text-right md:text-left">Cost</div>
                  <div className="text-right">Savings</div>
                </div>
              </div>
              
              {/* Pricing rows */}
              <div className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`py-6 px-8 ${item.highlight ? 'bg-purple-50/50' : ''} transition-colors duration-300 hover:bg-purple-50/30`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center">
                      {/* Company name */}
                      <div className="flex items-center">
                        <h3 className={`text-xl font-bold ${item.highlight ? 'text-purple-700' : 'text-gray-800'}`}>
                          {item.company}
                          {item.highlight && (
                            <motion.span 
                              className="inline-flex ml-2"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                              🎉
                            </motion.span>
                          )}
                        </h3>
                      </div>
                      
                      {/* Price comparison bar */}
                      <div className="hidden md:block">
                        <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${item.highlight 
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-500' 
                              : 'bg-gray-300'} rounded-full`}
                            custom={item.width}
                            variants={barVariants}
                          />
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right md:text-left">
                        <motion.span 
                          className={`text-2xl font-bold ${item.highlight ? 'text-purple-700' : 'text-gray-700'}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.7 + (index * 0.1) }}
                        >
                          {item.price}
                        </motion.span>
                      </div>
                      
                      {/* Savings */}
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          item.highlight 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {item.savings}
                        </span>
                      </div>
                    </div>
                    
                    {/* Mobile view price bar (only visible on small screens) */}
                    <div className="block md:hidden mt-3">
                      <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${item.highlight 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-500' 
                            : 'bg-gray-300'} rounded-full`}
                          custom={item.width}
                          variants={barVariants}
                        />
                      </div>
                    </div>
                    
                    {/* Best value tag - only show if item is highlighted and has bestValueText */}
                    {item.highlight && item.bestValueText && (
                      <motion.div 
                        className="mt-3 flex items-center text-sm text-purple-600 font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item.bestValueText || `Best value for your investment - Save ${item.savings} compared to top competitors`}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* CTA button */}
          {ctaText && (
            <motion.div 
              className="text-center mt-16"
              variants={itemVariants}
            >
              <motion.div className="inline-block relative">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-30"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.button 
                  className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-md shadow-lg font-medium text-lg"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCtaClick}
                >
                  {ctaText}
                </motion.button>
              </motion.div>
              
              {ctaSubtext && (
                <motion.p 
                  className="text-gray-500 mt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {ctaSubtext}
                </motion.p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;