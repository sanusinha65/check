import React, { useState } from "react";
import { motion } from "framer-motion";

function Stats({ statsData }) {
  // Using state to track if counting animation should start
  const [isInView, setIsInView] = useState(false);

  const stats = [
    { value: "10x", label: "Faster Lead Discovery" },
    { value: "95%", label: "Higher Engagement" },
    { value: "95%", label: "Data Accuracy" },
    { value: "70%", label: "Time Saved" }
  ];

  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Background circle animations
  const circleVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 1, type: "spring" } }
  };

  return (
    <section className="relative text-center w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-purple-300/30 filter blur-3xl"
          initial={{ x: -100, opacity: 0.2 }}
          whileInView={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-blue-300/30 filter blur-3xl"
          initial={{ x: 100, opacity: 0.2 }}
          whileInView={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-10 bg-white/50 backdrop-blur-sm py-20 px-8 md:px-12 rounded-3xl shadow-lg">
        <motion.h2 
          className="font-bold text-3xl md:text-4xl leading-tight mb-4 bg-gradient-to-r from-purple-700 to-indigo-600 inline-block text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {statsData.heading}
        </motion.h2>
        
        <motion.p 
          className="md:text-xl lg:text-lg mb-16 text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {statsData.subheading}
        </motion.p>
        
        {statsData.stats && (
          <motion.div 
            className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mt-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            onViewportEnter={() => setIsInView(true)}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={itemVariants}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-50 rounded-full -z-10"
                  variants={circleVariants}
                  style={{ width: '140%', height: '140%', top: '-20%', left: '-20%' }}
                />
                <div className="relative z-10 py-6 px-4">
                  <motion.p 
                    className="text-5xl md:text-6xl font-bold text-purple-700"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
                  >
                    {stat.value}
                  </motion.p>
                  <motion.p 
                    className="text-gray-700 font-medium mt-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                  >
                    {stat.label}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {statsData.cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="https://chromewebstore.google.com/detail/outx-linkedin-scrapping-t/epnimaeheelhgeelbppbfkjegklflakj" target="_blank">
              <motion.button 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer text-white px-8 py-3 rounded-full shadow-lg font-medium text-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(98, 65, 211, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Get Started Free
              </motion.button>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Stats;