import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"

function CookiePolicy() {
  return (
    <>
      <Header />
      <div className="w-full max-w-[1800px] py-20 text-center mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 lg:py-20 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:pt-10 pt-4">Cookie Policy</h1>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 pt-4">Last updated: February 26, 2025</h3>
        

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">Introduction</h4>
          <p>
          At OutX, we are committed to protecting the privacy of our website users. In accordance with the EU General Data Protection Regulation (GDPR) and the ePrivacy Directive, this cookie policy explains how we use cookies and similar technologies on our website. Please read this policy carefully to understand our practices regarding cookies and how they affect your browsing experience.
          </p>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">1. What are cookies? </h4>
          <p>
          Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences, such as language settings or login information. Cookies also help website owners analyze and improve website performance and functionality.
          </p>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">2. Types of cookies we use</h4>
          <p>
          On our website, we use two types of cookies:
          </p>
          <ol type='a'>
            <li><span className='font-bold'>Strictly necessary cookies:</span> These are technical and functional cookies that are essential for the proper functioning of our website. They ensure the website loads quickly and displays correctly, and also enable you to navigate through the website and use its features. There are no strictly necessary cookies.</li>
            <li><span className='font-bold'>Non-strictly necessary cookies</span> which enable us to use certain features. These cookies are third-party cookies, which means that they are provided by third-party providers for analytics, customer support, traffic analysis, SEO optimization, and video analytics purposes. These cookies help us understand how visitors interact with our website, optimize our online presence, and provide better support to our users. The third-party cookies we use are as follows:
            <ul className='list-disc list-inside'>
              <li><span className='font-bold'>Google Analytics:</span>This service measures website traffic and provides insights into user behavior, helping us improve the website. Google Analytics cookies have a lifespan of 2 years.
              </li>
              <li><span className='font-bold'>Crisp:</span>This customer support platform allows us to provide real-time assistance to our users. Crisp cookies have a lifespan of 9 months.</li>
              <li><span className='font-bold'>Ahrefs:</span>This traffic analysis and search engine optimization tool assists us in improving our website's visibility and performance in search engines. Ahrefs cookies have a lifespan of 9 months.</li>
              <li><span className='font-bold'>YouTube:</span>We use YouTube to embed videos in our articles. YouTube cookies help us gather video analytics, such as view counts and user engagement. YouTube cookies have a lifespan of 2 years.</li>
            </ul>
            </li>
          </ol>
          <p>Please note that we do not use targeting or advertising cookies on our website.</p>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">3. Consent management
          </h4>
          <p>
          When you visit our website for the first time, you will be presented with a cookie consent banner. This banner allows you to accept or refuse the use of non-essential cookies. Your choice will be remembered for a period of 6 months. After this period, you will be asked to provide your consent again.
          </p>
          <p>Please note that strictly necessary cookies cannot be refused, as they are essential for the proper functioning of our website.</p>
          <p>If you wish to change your cookie preferences after providing your initial consent, you can do so by adjusting your browser settings as described in Section 4 of this policy.
          </p>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">4. Managing your cookie preferences
          </h4>
          <p>
          You can control and adjust your browser settings. Most browsers allow you to block or delete cookies, but please note that disabling strictly necessary cookies may impact your browsing experience and the functionality of our website. For more information on how to manage and delete cookies in your browser, please refer to the following guides:
          </p>
          <ul className='list-disc list-inside'>
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Microsoft Edge</li>
            <li>Apple Safari</li>
          </ul>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">5. Updates to our cookie policy
          </h4>
          <p>
          We may update this cookie policy from time to time to ensure it remains accurate and compliant with relevant regulations. Any changes will be posted on this page, and we encourage you to review this policy periodically. We may ask for your consent again via the consent cookie banner if needed (for example, if we add another category of non-strictly necessary cookies).</p>
        </div>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">6. Contact us
          </h4>
          <p>If you have any questions or concerns about our use of cookies, please feel free to contact us at: kavya@outx.ai
          </p>
        </div>

      </div>
      <Footer/>
    </>
  );
}

export default CookiePolicy;
