import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"
import Meta from '../helper/Meta.jsx';

function CCPAPrivacyPolicy() {
  return (
    <>
      <Meta 
        title="Outx.ai CCPA Privacy Policy" 
        description="Understand how Outx.ai complies with CCPA for California users scraping LinkedIn and tracking posts." 
        keywords="CCPA LinkedIn scraping, Outx.ai CCPA, LinkedIn data privacy" 
      />
      <Header />
      <div className="w-full max-w-[1800px] py-20 text-center mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 lg:py-20 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:pt-10 pt-4">CCPA Privacy</h1>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 pt-4">OutX CCPA Privacy Notice</h3>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 pt-4">Effective Date: February 26, 2025</h3>
        
        <div className="text-left pt-10 space-y-6">
          <p>
          OutX is committed to protecting your privacy and ensuring compliance with the California Consumer Privacy Act (CCPA). This notice explains your rights under CCPA and how we collect, use, and share your personal information.</p>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">1. Information We Collect </h4>
          <p>
          We collect the following categories of personal information from users:</p>
          <ul className='list-disc list-inside'>
            <li><span className='font-bold'>Identifiers</span> (e.g., name, email, LinkedIn profile URL)</li>
            <li><span className='font-bold'>Internet Activity</span> (e.g., interactions with our service, usage data)</li>
            <li><span className='font-bold'>Professional Information</span> (e.g., LinkedIn job title, company details)</li>
            </ul>
            <p>We do not sell personal information to third parties.</p>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">2. Your CCPA Rights</h4>
          <p>
          As a California resident, you have the following rights:
          </p>
          <ul className='list-disc list-inside'>
            <li><span className='font-bold'>Right to Know:</span> Request details about the personal data we collect, use, or share.</li>
            <li><span className='font-bold'>Right to Delete: </span>Request deletion of your personal data, subject to exceptions.</li>
            <li><span className='font-bold'>Right to Opt-Out</span>We do not sell personal data, but you may opt-out of data collection where applicable.</li>
            <li><span className='font-bold'>Right to Non-Discrimination:</span> Exercising your rights will not result in unfair treatment.</li>
            </ul>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">3. How to Exercise Your Rights</h4>
          <p>
          You can submit a request to access or delete your data by:
          </p>
          <ul className='list-disc list-inside'>
            <li>Emailing us at hello@outx.ai</li>
        </ul>
        <p>We will verify your request by confirming your identity before processing it.</p>
        </div>
        
        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">4. Data Retention & Security</h4>
          <p>
          We retain user data as long as necessary for providing our services. We implement security measures to protect your information from unauthorized access.
          </p>
        </div>
        
        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">5. Updates to This Notice</h4>
          <p>
          We may update this CCPA notice periodically. Any changes will be posted on this page.
          </p>
          <p>For questions, contact us at hello@outx.ai</p>
        </div>
        

      </div>
      <Footer/>
    </>
  );
}

export default CCPAPrivacyPolicy;
