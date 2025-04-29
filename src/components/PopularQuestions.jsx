import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, HelpCircle, Search, Lightbulb, CheckCircle } from 'lucide-react';

const PopularQuestions = ({ faqs }) => {
  // Track expanded questions with a Set using the unique faq id
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const toggleQuestion = (id) => {
    setExpandedQuestions(prevExpanded => {
      // Create a new Set from the previous state
      const newExpanded = new Set(prevExpanded);
      
      // Toggle the question: If it's already in the set, remove it; otherwise, add it
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      
      return newExpanded;
    });
  };

  // Icons for different question categories
  const getIcon = (index) => {
    const icons = [HelpCircle, MessageCircle, Lightbulb, Search, CheckCircle];
    const IconComponent = icons[index % icons.length];
    return <IconComponent />;
  };

  // Colors for different question categories
  const getColor = (index) => {
    const colors = [
      'from-purple-500 to-blue-500',
      'from-blue-500 to-cyan-500',
      'from-amber-500 to-orange-500',
      'from-green-500 to-emerald-500',
      'from-rose-500 to-pink-500'
    ];
    return colors[index % colors.length];
  };

  // Divide FAQs into two separate columns instead of using grid or flexbox
  const leftColumnFaqs = faqs.filter((_, index) => index % 2 === 0);
  const rightColumnFaqs = faqs.filter((_, index) => index % 2 === 1);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50 to-white"></div>
        <motion.div 
          className="absolute top-40 right-10 w-96 h-96 rounded-full bg-purple-100 opacity-30 filter blur-3xl"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, -20, 0],
            scale: [1, 1.05, 1] 
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-blue-100 opacity-30 filter blur-3xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 20, 0],
            scale: [1, 1.05, 1] 
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3"
          >
            <motion.div 
              className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100"
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <HelpCircle className="w-8 h-8 text-purple-600" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Popular Questions
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about OutX LinkedIn automation tools
          </motion.p>
          
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-8 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Two column layout with separate columns */}
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left Column */}
          <div className="md:w-1/2 space-y-6 md:space-y-8">
            {leftColumnFaqs.map((faq, index) => {
              const actualIndex = index * 2; // Calculate the actual index in the original array
              return (
                <FaqItem 
                  key={faq.id} 
                  faq={faq} 
                  index={actualIndex}
                  isExpanded={expandedQuestions.has(faq.id)}
                  toggleQuestion={toggleQuestion}
                  getIcon={getIcon}
                  getColor={getColor}
                />
              );
            })}
          </div>
          
          {/* Right Column */}
          <div className="md:w-1/2 space-y-6 md:space-y-8 mt-6 md:mt-0">
            {rightColumnFaqs.map((faq, index) => {
              const actualIndex = index * 2 + 1; // Calculate the actual index in the original array
              return (
                <FaqItem 
                  key={faq.id} 
                  faq={faq} 
                  index={actualIndex}
                  isExpanded={expandedQuestions.has(faq.id)}
                  toggleQuestion={toggleQuestion}
                  getIcon={getIcon}
                  getColor={getColor}
                />
              );
            })}
          </div>
        </div>
        
        {/* <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative inline-block">
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25"
              animate={{ opacity: [0.2, 0.25, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.button 
              className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Get More Answers
            </motion.button>
          </div>
          
          <motion.p 
            className="text-sm text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Still have questions? <a href="/contact" className="text-purple-600 font-medium hover:text-purple-700 hover:underline transition-colors">Contact our support team</a>
          </motion.p>
        </motion.div> */}
      </div>
    </section>
  );
};

// Extract the FAQ item into a separate component for cleaner code
const FaqItem = ({ faq, index, isExpanded, toggleQuestion, getIcon, getColor }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <button
        className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none"
        onClick={() => toggleQuestion(faq.id)}
      >
        <div className="flex items-center">
          <motion.div 
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getColor(index)} flex items-center justify-center text-white mr-4 flex-shrink-0`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {getIcon(index)}
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 pb-6"
          >
            <div className="mt-2 pt-4 border-t border-gray-100 text-gray-600 leading-relaxed">
              {faq.answer.split('.').map((sentence, i) => (
                sentence.trim() ? (
                  <motion.div 
                    key={i} 
                    className="mb-3 flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    {i > 0 && i < faq.answer.split('.').length - 1 && (
                      <motion.span 
                        className={`inline-block w-2 h-2 rounded-full bg-gradient-to-br ${getColor(index)} mt-2 mr-3 flex-shrink-0`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: i * 0.1 + 0.2 }}
                      />
                    )}
                    <span>{sentence.trim() + (i < faq.answer.split('.').length - 2 ? '.' : '')}</span>
                  </motion.div>
                ) : null
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PopularQuestions;