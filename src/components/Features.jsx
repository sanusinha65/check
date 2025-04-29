import React from "react";
import { motion } from "framer-motion";

export default function SalesNavigatorScraper({ features, cta }) {
  return (
    <section className="relative w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 py-24">
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
        className="text-center"
      >
        <motion.h2 
          className="font-bold text-3xl md:text-4xl leading-tight mb-16 relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Key Benefits of OutX
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"
            initial={{ width: '0%' }}
            whileInView={{ width: '50%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-md border border-white/20 flex flex-col items-center h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 } 
              }}
            >
              <motion.div 
                className="text-purple-600 text-3xl p-4 bg-white rounded-lg shadow-sm mb-5"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <i className={`fas ${feature.icon}`}></i>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold mb-3 text-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-700"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
        
        {cta && (
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div className="relative inline-block">
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.button 
                className="relative px-8 py-3 text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)" 
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => window.open(cta.href, "_blank")}
              >
                {cta.text}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}