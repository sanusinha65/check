import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faFire, faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons";

function FeaturesGrid() {
  const features = [
    {
      icon: faSearch,
      title: "Monitor Targeted Keywords",
      description: "Get real-time alerts on LinkedIn posts mentioning key topics.",
      bgColor: "from-purple-500/10 to-blue-500/5",
      iconColor: "text-purple-600"
    },
    {
      icon: faFire,
      title: "Track Competitors & Trends",
      description: "Stay ahead by following industry trends and competitor insights.",
      bgColor: "from-orange-500/10 to-red-500/5",
      iconColor: "text-orange-600"
    },
    {
      icon: faChartLine,
      title: "Engage at the Right Moment",
      description: "Jump into relevant conversations and build relationships faster.",
      bgColor: "from-blue-500/10 to-cyan-500/5",
      iconColor: "text-blue-600"
    },
    {
      icon: faRefresh,
      title: "Automate & Scale Engagement",
      description: "Never miss an opportunity—track, engage, and convert leads.",
      bgColor: "from-green-500/10 to-emerald-500/5",
      iconColor: "text-green-600"
    }
  ];

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
          Advanced LinkedIn Keyword Tracking
        </motion.h3>
        
        <motion.p 
          className="text-gray-700 text-lg max-w-3xl mx-auto mt-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Never miss a potential lead again. Track keywords across LinkedIn and get instant notifications when your ideal prospects post or engage.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm p-8 rounded-xl shadow-md border border-white/20 flex flex-col items-start h-full`}
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
                className={`${feature.iconColor} text-3xl p-3 bg-white rounded-lg shadow-sm mb-4`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FontAwesomeIcon icon={feature.icon} />
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold mb-3 text-left text-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-700 text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default FeaturesGrid;