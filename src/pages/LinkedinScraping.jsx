import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Steps from "../components/Steps";
import ChromeExtension from "../assets/extension.png";
import PopularQuestions from '../components/PopularQuestions';
import Features from '../components/Features';
import Intro from '../components/Intro';
import Pricing from '../components/Pricing';
import Banner from '../components/Banner';
import ExtractLeads from "../assets/extractleads.png";
import Meta from '../helper/Meta';

function LinkedinScraping ()
{
  
  const pricingData = {
    title: "70% cheaper than competitors",
    subtitle: "Compare the cost of extracting 2000 emails from LinkedIn",
    ctaText: "Start Saving Today",
    ctaSubtext: "No credit card required. Try it risk-free.",
    items: [
      { company: "LIX", price: "189$", width: "100%", highlight: false, savings: "0%" },
      { company: "PHANTOMBUSTER", price: "99$", width: "80%", highlight: false, savings: "48%" },
      { company: "EVABOOT", price: "78$", width: "60%", highlight: false, savings: "59%" },
      { 
        company: "OUTX", 
        price: "39$", 
        width: "25%", 
        highlight: true, 
        savings: "79%",
        bestValueText: "Best value for your investment - Save 79% compared to top competitors"
      }
    ]
  };
  
    // Animation variants for fade-in effects
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const steps = [
        {
            number: 1,
            title: "Install OutX.ai Chrome Extension",
            description:
                "Export entire searches, lead lists, or projects from LinkedIn.",
            features: [
                "Download and set it up in seconds—no complex configurations needed.",
                "Works seamlessly with Chrome for instant access.",
            ],
            image: ChromeExtension,
            cta: {
                text: "Get Chrome Extension",
                href: "https://chromewebstore.google.com/search/OutX%20-%20LinkedIn%20Scrapping%2C%20Tracking%20%26%20Automation?pli=1",
            },
        },
        {
            number: 2,
            title: "Run a search on LinkedIn Sales Navigator",
            description:
                "Find verified email addresses and phone numbers for your LinkedIn Prospects with 99% accuracy.",
            features: [
                "Apply filters such as role, industry, and geography to refine results.",
                "Identify high-quality leads that match your ideal target audience.",
            ],
            image: ChromeExtension,
        },
        {
            number: 3,
            title: "Click & Scrape",
            description:
                "Built in prospect and company enrichment for your leads.",
            features: [
                "Click the OutX.ai icon to start extracting leads automatically.",
                "The scraper runs in the background while you continue working.",
            ],
            image: ChromeExtension
        },
        {
            number: 4,
            title: "Enrich with Verified Emails",
            description:
                "Built in prospect and company enrichment for your leads.",
            features: [
                "The tool automatically finds and verifies B2B emails for your leads.",
                "Get clean, accurate contact details for successful outreach. ",
            ],
            image: ChromeExtension
        },
        {
            number: 5,
            title: "Export Data",
            description:
                "Built in prospect and company enrichment for your leads.",
            features: [
                "Download your scraped leads as a CSV file for easy access.",
                "Sync seamlessly with your CRM to streamline your workflow.",
            ],
            image: ChromeExtension
        },
    ];

    const stepsHeading = {
        heading: "How It Works"
    };

    const data = {
        heading: "The Most Powerful LinkedIn Sales Navigator Scraper",
        subheading: "Extract targeted leads, find verified emails, and export to CSV or your CRM - 100% cloud-based",
        para: false
    };

    const newsletterData = {
        heading: "Download your first leads now",
        cta: "Export your list",
        workEmail: false,
        features: false
    };

    const features = [
        { icon: "fa fa-mouse", title: "Quick Chrome Extension", description: "Install in seconds and start extracting leads immediately - no complex setup required" },
        { icon: "fa fa-search", title: "Bulk Lead Extraction", description: "Extract up to 2,500+ leads daily with verified business emails and contact details" },
        { icon: "fa fa-list", title: "99% Email Accuracy", description: "Advanced verification ensures you get valid, deliverable business emails" },
        { icon: "fa fa-broom", title: "Direct CRM Integration", description: "Export data directly to your CRM or download as CSV for immediate use" },
        { icon: "fa fa-file-csv", title: "Cloud Processing", description: "Process leads in the background while you focus on other tasks" },
        { icon: "fa fa-cloud", title: "Safe & Secure", description: "Enterprise-grade security with dedicated IPs to protect your account" },
    ];

    const statsData = {
        heading: "Start Scraping Today!",
        subheading: "Install OutX.ai Chrome Extension – Free!",
        stats: false,
        cta: true
    };

    const faqs = [
        {
            id:1,
            question: "Why Choose OutX?",
            answer:
                "Fast & Affordable – Get leads in seconds at the lowest price. Accurate Data – Extract only high-quality and verified emails. Easy to Use – No coding required, just install and start scraping. Safe & Secure – Compliant with LinkedIn guidelines."
        },
        {
            id: 2,
            question: "How to export Sales Navigator Leads?",
            answer:
                "To export leads from LinkedIn Sales Navigator using OutX Chrome Extension, install the extension, run a Sales Navigator search, and click OutX to extract leads. Enable email discovery for verified emails and download the data in CSV format for outreach. Simple, fast, and cost-effective!"
        },
        {
            id: 3,
            question: "How to Use LinkedIn for Sales Prospecting?",
            answer:
                "Maximize LinkedIn Sales Navigator to find decision-makers using advanced filters. Optimize your profile to establish credibility, send personalized connection requests, and engage with prospects through comments and InMail. Use OutX to export and enrich leads with verified emails, making outreach efficient. Combine organic engagement with targeted outreach for better conversions."
        },
        {
            id: 4,
            question: "Why is OutX the best LinkedIn email finder?",
            answer:
                "OutX seamlessly integrates with LinkedIn through a Chrome extension, allowing you to find emails for entire LinkedIn searches or saved lists with a single click. Plus, you only pay for valid emails."
        },
        {
            id: 5,
            question: "How many leads can I extract from LinkedIn?",
            answer:
                "OutX allows you to extract up to 2,500 leads from a single Sales Navigator search or saved list. You can run unlimited scans daily while staying within LinkedIn's fair use limits."
        },
        {
            id: 6,
            question: "How do I get charged exactly?",
            answer:
                "You're only charged for each valid email found. OutX estimates the cost before running a search, and the final charge is often lower. Plus, we provide risky emails for free!"
        }
    ];

    return (
        <>
        <Meta 
      title="LinkedIn Sales Navigator Scraper - Export Leads Fast | Outx.ai" 
      description="Scrape and export Sales Navigator leads with emails in one click. Save hours of manual work. No LinkedIn access shared." 
      keywords="Sales Navigator scraper, export LinkedIn leads, LinkedIn lead generation, LinkedIn scraping tool" 
    />
        <div className="overflow-hidden relative bg-gradient-to-b from-slate-50 to-white">
            {/* Background decorative elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div 
                    className="absolute top-1/3 left-5 w-96 h-96 rounded-full bg-purple-100 opacity-30 filter blur-3xl"
                    animate={{ 
                        x: [0, 20, 0], 
                        y: [0, -20, 0] 
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 25,
                        ease: "easeInOut" 
                    }}
                />
                <motion.div 
                    className="absolute top-2/3 right-5 w-80 h-80 rounded-full bg-blue-100 opacity-30 filter blur-3xl"
                    animate={{ 
                        x: [0, -20, 0], 
                        y: [0, 20, 0] 
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 20,
                        ease: "easeInOut" 
                    }}
                />
            </div>
            
            {/* Content with z-index to position above background */}
            <div className="relative z-10">
                <Header/>
                
                {/* Page Sections */}
                <Banner data={data}/>
                
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                >
                    <Intro
                        title="Scrape LinkedIn Leads Instantly with OutX's Sales Navigator Scraper"
                        description="Export Targeted Leads with Emails & Phone Numbers – Download Sales Navigator Data to CSV in Seconds"
                        image={ExtractLeads}
                        steps={[
                            {
                                "title": "Install Extension",
                                "description": "Quick setup with our Chrome extension."
                            },
                            {
                                "title": "Search & Scrape Sales Navigator Leads",
                                "description": "Run Sales Navigator searches and extract leads instantly."
                            },
                            {
                                "title": "Export & Engage",
                                "description": "Download as CSV or sync with your CRM and start outreach."
                            }
                        ]}
                        buttonText="Get Started Free – Try It Today"
                        buttonLink="/register"
                        subtext="No credit card required. Start extracting leads in minutes!"
                    />
                </motion.div>
                
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-white/50 -z-10"></div>
                    <Steps stepsData={steps} heading="How It Works!" />
                </motion.div>
                
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                >
                    <Features features={features}/>
                </motion.div>
                
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50/30 -z-10"></div>
            <Pricing
              pricingData={pricingData}
              onCtaClick={() => console.log("CTA clicked")}
            />
                </motion.div>
                
               
                
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                >
                    <PopularQuestions faqs={faqs}/>
                </motion.div>
                
                <Footer/>
            </div>
            
            {/* Navigation helper - smooth scroll button */}
            <motion.button
                className="fixed bottom-8 right-8 w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-purple-700"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <i className="fa fa-arrow-up"></i>
            </motion.button>
        </div>
        </>
    );
}

export default LinkedinScraping;