import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function CarouselGenerator() {
  const [activeCard, setActiveCard] = useState("import");

  const cardVariants = {
    hover: { scale: 1.05 },
  };

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
          Advanced LinkedIn Carousel Generator
        </motion.h3>

        {/* 🔥 This was the bug — removed unnecessary "(" */}
        <div className="flex flex-col items-center mt-10">
          {/* Cards */}
          <div className="flex gap-6 justify-center items-center">
            {/* Card 1: Import */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-xl shadow-md w-[300px] p-6 text-center cursor-pointer"
              onClick={() => setActiveCard("import")}
            >
              <h2 className="text-lg font-semibold text-[#6241D3] mb-2">Import</h2>
              <motion.p
                key="importDefault"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-600 text-sm"
              >
                Turn tweets, reddit posts and images into threads.
              </motion.p>
            </motion.div>

            {/* Card 2: Powered by AI */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-xl shadow-md w-[300px] p-6 text-center cursor-pointer"
              onClick={() => setActiveCard("ai")}
            >
              <h2 className="text-lg font-semibold text-[#6241D3] mb-2">Powered by AI</h2>
              <motion.p
                key="aiDefault"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-600 text-sm"
              >
                Create your own carousels from scratch and use AI to help you.
              </motion.p>
            </motion.div>
          </div>

          {/* Dynamic Content Below Cards */}
          <AnimatePresence mode="wait">
            {activeCard && (
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-10 text-center"
              >
                {activeCard === "import" && (
                  <>
                    <button className="bg-[#6241D3] px-4 py-2 rounded-md text-white">Add New</button>
                  </>
                )}

                {activeCard === "ai" && (
                  <>
                    <h3 className="text-xl font-bold text-gray-800">Enter a topic for your carousel</h3>
                    <input type="text" className="py-2 px-2 border border-gray-400 mt-4 rounded-md"/>
                    <button className="bg-[#6241D3] px-4 py-2 rounded-md text-white">Generate</button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

export default CarouselGenerator;
