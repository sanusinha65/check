import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Steps from "../components/Steps"
import SearchScrapLead from "../assets/extension.png";
import ChromeExtension from "../assets/extension.png";
import { motion } from 'framer-motion';
import PopularQuestions from '../components/PopularQuestions';
import CarouselGenerator from '../components/CarouselGenerator';

function Banner() {
    // Animation variants
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.2,
          delayChildren: 0.3
        }
      }
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
    };
  
    // Animation for floating elements
    const floatingAnimation = {
      y: [0, -10, 0],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };
  
    const pulseAnimation = {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    };
  
    return (
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-50 via-white to-blue-50"></div>
          
          <motion.div 
            className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-300/30 filter blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          
          <motion.div 
            className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-blue-300/30 filter blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </motion.div>
        </div>
        
        
        {/* Main content */}
        <motion.div 
          className='relative z-10 flex flex-col items-center justify-center w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 py-20 lg:py-28'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold lg:leading-18 text-center mt-10 sm:mt-30 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-600'
            variants={itemVariants}
          >
            LinkedIn Carousel Generator
            <motion.div 
              className="h-1 w-24 sm:w-40 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "40%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.h1>
          
          <motion.p 
            className='text-base sm:text-lg md:text-xl lg:text-2xl text-center lg:leading-10 sm:leading-8 lg:my-8 my-8 max-w-4xl text-gray-700'
            variants={itemVariants}
          >
            Create LinkedIn carousel posts for free with AI and our advanced editor, or turn tweets, reddit posts and images into carousels.
          </motion.p>

          {/* <motion.div 
                className="flex flex-col min-w-full sm:min-w-[24rem] md:min-w-[32rem] lg:min-w-[40rem] justify-center items-center gap-4 px-4 py-6 border border-gray-300 rounded-md shadow-lg"
                variants={itemVariants}
            >
                <div className="flex flex-col w-full">
                    <label htmlFor="urlInput" className="text-gray-600 font-semibold mb-2">Post Content</label>
                    <textarea
                        id="urlInput"
                        placeholder="Paste your LinkedIn post here..."
                        maxLength={280}
                        rows={10}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    className="px-6 py-3 bg-gradient-to-r self-end from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:opacity-90 transition mt-4 sm:mt-0"
                >
                   Boost
                </button>
            </motion.div> */}

        </motion.div>
      </section>
    );
}

function LinkedinCarouselGenerator()
{

      const steps = [
            {
              number: 1,
              title: "Turn Tweets, Reddit posts, and images into threads",
              description:
                "",
              features: [
                "Copy and paste the tweets, Reddit posts, or image URLs.",
                "To add more slides, click the Add new button.",
                "Take advantage of OutX's Advanced options and change the theme, include engagement, or add details. (only for tweets)",
                "Click on Generate Carousel.",
                "Click Download Carousel or download images individually."
              ],
              image: ChromeExtension,
            },
            {
              number: 2,
              title: "Have AI Generate the LinkedIn Carousel for You",
              description:
                "",
              features: [
                "Enter a topic that interests you.",
                "Click on Generate Carousel.",
                "Edit the carousel. Change the theme, add your LinkedIn handle, profile picture, etc.",
                "Preview the carousel.",
                "Click on Download once you're happy with the result."
              ],
              image: SearchScrapLead,
            }
          ];

          const faqs = [
            {
              id:1,
              question: "Is this tool free?",
              answer:
                "Yes! This tool is entirely free, no catch."
            },
            {
              id:2,
              question: "What are Linkedin carousel posts?",
              answer:
                "The carousel format on Linkedin is when you upload a set of slides that people can navigate, similar to a PowerPoint presentation. In order to create such a posts, you need to create a PDF document and upload it in your post. Linkedin will then interpret each page as a different slide of your presentation."
            },
            {
              id:3,
              question: "Why should I care about LinkedIn carousels?",
              answer:
                "LinkedIn rewards publishers that keep users on the platform with extra visibility. And needless to say that carousel are rather catchy long-form content that will do just that. Carousels are also one of the most popular content formats on LinkedIn right now, generating a high level of engagement. With the 800M+ users LinkedIn has, we think it’s a good idea if you can leverage part of that audience to your advantage."
            },
            {
              id:4,
              question: "What is the correct LinkedIn carousel format and size?",
              answer:
                "LinkedIn carousels are typically PDFs which can exist in 2 different sizes: 1080x1080 pixels (square format) or 1080x1350 pixels (slightly higher than larger). At OutX, we prefer the look and feel of that second format which is a bit more original and gives you more space to express yourself. Which is why we've made it our default format for our carousels."
            },
            {
              id:5,
              question: "How does the carousel generator work?",
              answer:
                "Start by choosing whether you want to repurpose tweets, threads or other media into a carousel (classic version), or if you prefer creating your own carousel from scratch with the help of AI (new version).If you chose the classic version, here’s how it works: All you need to do is import the various “slides” you want for your final carousel.Those can be either tweets, Reddit posts or image URLs. Just copy/paste those URLs into each field at the top, and press “add new” to add an image.When you're done, hit “generate carousel” and wait a couple minutes until the “download carousel” button is available. If you chose the new version (with AI): Start from scratch or let AI generate some slide ideas for you by telling it what you want to talk about Edit the content and make sure you add your profile pic, name, handle for greater visibility. Choose the theme (background and color)• And finally preview and download your carousel in PDf format"
            },
            {
              id:6,
              question: "Does It Work on All LinkedIn Posts?",
              answer:
                "Yes, OutX scans posts from your network, industry leaders, and public content, giving you a comprehensive view of relevant discussions."
            }
          ];      

  return (
    <>
    <Header/>
    <Banner/>
    <CarouselGenerator/>
    <Steps stepsData={steps} heading="How to Use OutX's LinkedIn Carousels Generator"/>
    <PopularQuestions faqs={faqs}/>
    <Footer/>
    </>
  )
}

export default LinkedinCarouselGenerator