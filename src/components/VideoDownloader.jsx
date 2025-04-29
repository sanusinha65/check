import React from "react";
import { motion } from "framer-motion";

export default function VideoDownloader({ features, cta }) {
  const pointers = [
    "Short-form content is on the rise, and users are mostly skimming through their LinkedIn feeds rather than reading in-depth.",
    "Today’s LinkedIn audience doesn't have the patience for lengthy text posts — they prefer short, clear, actionable updates with easy formatting and strong CTAs.",
    "Videos are one of the most powerful ways to grab attention and drive quick engagement.",
    "Within just a year of launch, LinkedIn video posts amassed over 300 million impressions on the platform.",
    "As visual content continues to dominate, video posts are pulling in higher engagement rates on LinkedIn — simply because they work.",
    "LinkedIn videos generate 3x more engagement compared to traditional text posts.",
    "Members on LinkedIn are 5x more likely to start conversations and connect through native video content.",
    "In the B2B space, LinkedIn videos have become the preferred strategy.",
    "Data shows 85% of B2B marketers find video to be an effective lead generation tool.",
    "At the same time, 78% of marketers say video has helped boost their brand awareness.",
    "Keep scrolling to discover the 4 most effective tactics to maximize your LinkedIn video performance."
  ];  

  const pointers2 = [
    {
      title: "Keep Your Video Length Just Right.",
      desc: "LinkedIn native videos can range from 3 seconds to 10 minutes. But what’s the sweet spot? Videos under 30 seconds tend to drive 23% higher user engagement."
    },
    {
      title: "Always Include Subtitles.",
      desc: "Around 85% of LinkedIn videos are viewed without sound. Subtitles boost engagement by providing clarity and making your content accessible to a wider audience, including non-native speakers. Plus, viewers remember 95% of a video message compared to just 10% of a text-based one."
    },
    {
      title: "Craft a Strong Short Description.",
      desc: "Hook your audience early by writing a catchy intro or description for your video. Use emojis, format smartly, or kick off with a strong hook. A good opening keeps viewers watching longer, helping your video reach more people."
    },
    {
      title: "Include a Clear Call to Action.",
      desc: "Place your CTA in the first comment of your video to guide your audience on the next steps. Share links, resources, or tools that tie into your video to drive more meaningful engagement."
    }
  ];  
  
  const pointers3 = [
    {
      title: "Videos Drive Higher Engagement.",
      desc: "LinkedIn videos generate 5x more engagement, helping you grab your audience’s attention and earn more likes, comments, and shares."
    },
    {
      title: "Videos Strengthen Your Brand Identity.",
      desc: "Sharing videos that align with your brand reinforces your image among LinkedIn connections. Avoid posting random or unrelated videos — off-brand content can confuse your audience and make your business appear less professional."
    },
    {
      title: "Videos Help You Stand Out in the Feed.",
      desc: "Want your business to catch more eyes as users scroll? Videos outperform text and images when it comes to grabbing attention. Plus, your audience retains 95% of a message via video compared to just 10% through text."
    }
  ];  

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
          Why videos are good for LinkedIn?
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"
            initial={{ width: '0%' }}
            whileInView={{ width: '50%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.h2>

        {/* Render pointers */}
        <ul className="text-left mx-auto space-y-4 text-gray-700">
          {pointers.map((point, idx) => (
            <li key={idx} className="relative pl-6">
              <span className="absolute left-0 top-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
              {point}
            </li>
          ))}
        </ul>

        <motion.h4 
        className="text-left font-semibold text-xl md:text-2xl my-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        >
        What Are the Most Effective Tactics for LinkedIn Videos?
        </motion.h4>

        <ol className="relative text-left mx-auto space-y-6 text-gray-700">
        {pointers2.map((point, idx) => (
            <motion.li
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="relative pl-10"
            >
            <span className="absolute left-0 top-1 text-sm font-semibold w-6 h-6 flex items-center justify-center bg-purple-500 text-white rounded-full">
                {idx + 1}
            </span>
            <strong className="block text-lg text-gray-900">{point.title}</strong>
            <span className="text-base text-gray-700">{point.desc}</span>
            </motion.li>
        ))}
        </ol>

        <motion.h4 
        className="text-left font-semibold text-xl md:text-2xl my-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        >
        What Are the Benefits of Posting Video Content on LinkedIn?
        </motion.h4>


        <ol className="relative text-left mx-auto space-y-6 text-gray-700">
        {pointers3.map((point, idx) => (
            <motion.li
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="relative pl-10"
            >
            <span className="absolute left-0 top-1 text-sm font-semibold w-6 h-6 flex items-center justify-center bg-purple-500 text-white rounded-full">
                {idx + 1}
            </span>
            <strong className="block text-lg text-gray-900">{point.title}</strong>
            <span className="text-base text-gray-700">{point.desc}</span>
            </motion.li>
        ))}
        </ol>


      </motion.div>
    </section>
  );
}
