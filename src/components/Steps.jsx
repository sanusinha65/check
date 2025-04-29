import React from "react";
import { motion } from "framer-motion";

const StepCard = ({ number, title, features = [], image, cta, isLast }) => {
  return (
    <div className="relative">
      {/* Connection line */}
      {!isLast && (
        <div className="hidden md:block absolute left-6 top-[5.5rem] bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-500 z-0"></div>
      )}

      <motion.div 
        className="relative flex flex-col md:flex-row md:items-start items-center gap-8 pb-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Step Number with connecting line */}
        <div className="flex flex-col items-center">
          <motion.div 
            className="flex items-center justify-center w-12 h-12 text-xl font-bold bg-white text-purple-600 rounded-full shadow-lg border-2 border-purple-500 z-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {number}
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-10 w-full">
          {/* Image Section */}
          <motion.div 
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full rounded-xl overflow-hidden shadow-xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl blur opacity-20"></div>
              <motion.img 
                src={image} 
                alt={title} 
                className="relative w-full h-auto object-cover rounded-xl" 
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              />
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div 
            className="w-full lg:w-3/5 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Title */}
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {title}
            </motion.h3>
          
            {/* Features List */}
            {features.length > 0 && (
              <motion.ul 
                className="space-y-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                  >
                    <div className="p-1 bg-purple-100 rounded-full mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6241D3"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* Call-To-Action Button */}
            {cta && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.button
                  className="px-6 py-2 text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={() => window.open(cta.href, "_blank")}
                >
                  {cta.text}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Steps = ({ stepsData, heading }) => {
  return (
    <section className="relative w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 py-24">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-purple-200/30 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-200/30 filter blur-3xl"></div>
      </div>

      {heading && (
        <div className="text-center mb-16">
          <motion.h2 
            className="font-bold text-3xl md:text-4xl leading-tight text-gray-900 inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {heading}
            <motion.div 
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.h2>
        </div>
      )}
      
      <div className="md:ml-10 mt-16">
        {stepsData.map((step, index) => (
          <StepCard 
            key={step.number} 
            {...step} 
            isLast={index === stepsData.length - 1} 
          />
        ))}
      </div>
    </section>
  );
};

export default Steps;