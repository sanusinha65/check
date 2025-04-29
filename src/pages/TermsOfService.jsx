import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx"
import Meta from '../helper/Meta.jsx';

function TermsOfService() {
  return (
    <>
     <Meta 
      title="Outx.ai Terms of Service" 
      description="Review the terms and conditions for using Outx.ai's LinkedIn scraping and tracking tools." 
      keywords="Outx.ai terms, LinkedIn scraper terms, Outx.ai user agreement" 
    />
      <Header />
      <div className="w-full max-w-[1800px] py-20 text-center mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 lg:py-20 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:pt-10 pt-4">Terms of Service</h1>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 pt-4">Last updated: March 13, 2025</h3>
        
        <div className="text-left pt-10 space-y-6">
          <p>Welcome to OutX.ai! These Terms of Service (“Terms”) govern your access to and use of the OutX.ai website, Chrome extension, and related services (collectively, the “Service”), provided by OutX.ai (“OutX,” “we,” “us,” or “our”). By accessing or using the Service, you (“User,” “you,” or “your”) agree to be bound by these Terms, including our Cookie Policy and Privacy Policy detailed herein. If you do not agree, you must not use the Service. DISCLAIMER: The Service is designed solely for extracting publicly available LinkedIn data, automating outreach, and tracking keywords on LinkedIn in compliance with applicable laws and LinkedIn’s Terms of Service (TOS). Any misuse, including scraping private data or violating LinkedIn’s TOS, is your sole responsibility, and OutX disclaims all liability for such actions.</p>
          <p>These Terms comply with laws in the United States, European Union, India (including the Digital Personal Data Protection Act, 2023), and other jurisdictions as outlined below.</p>
        </div>

        <hr className='my-6'/>


        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">1. Overview of the Service</h4>
          <p>OutX.ai is a LinkedIn automation tool designed for sales professionals, recruiters, and marketers to streamline outreach, prospecting, and monitoring. The Service enables users to send personalized messages, automate connection requests, extract publicly available data only from LinkedIn, including Sales Navigator (e.g., names, job titles, company details, emails), and track keywords within publicly available LinkedIn content (e.g., posts, comments, profiles) to monitor mentions of brands, products, or topics of interest. It operates as a Chrome extension compatible with Google Chrome or Chrome-based browsers (e.g., Brave), with features like lead management, CSV data export, and keyword tracking reports. <strong>DISCLAIMER: OutX does not authorize or enable scraping of private or restricted LinkedIn data, including for keyword tracking. You are solely responsible for ensuring compliance with LinkedIn’s TOS and all applicable laws. Misuse may result in legal consequences, including account bans or lawsuits, for which OutX is not liable.</strong></p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">2. Eligibility</h4>
          <p>To use the Service, you must:</p>
          <ul className='list-inside list-disc'>
            <li>Be at least 18 years old (or the age of majority in your jurisdiction) and legally capable of entering into a binding agreement.</li>
            <li>Have a valid LinkedIn account, as the Service requires your own login credentials.</li>
            <li>If acting for an organization, have authority to bind that organization to these Terms.</li>
          </ul>
          <p>We do not knowingly provide services to individuals below the legal age of consent (e.g., 18 in India per the IT Act and DPDP Act). Accounts registered by bots or automated methods are prohibited.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">3. License to Use the Service</h4>
          <p>We grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to use the Service for personal or business purposes, including keyword tracking on LinkedIn, subject to these Terms and LinkedIn’s TOS.You may not build a similar or competitive service using the Service. For EU users, this is based on legitimate interest (GDPR Art. 6(1)(f)); for Indian users, it aligns with the DPDP Act’s lawful purpose (Sec. 4); for California residents, it meets CCPA disclosure requirements. This license terminates automatically if you violate these Terms and may be revoked by OutX at any time in its sole discretion.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">4. User Responsibilities</h4>
          <h2 className="font-bold mt-2">4.1 Account Creation and Security</h2>
          <p>You must create an account (“Account”) with a unique identifier (e.g., email) and password. You are responsible for maintaining the confidentiality of your Account credentials and for all activities under your Account, including keyword tracking settings. Sharing credentials with others or creating multiple Accounts is prohibited. Notify us immediately at [support@outx.ai] of any unauthorized use or security breaches. OutX is not liable for damages resulting from your failure to secure your Account.</p>
          <h2 className="font-bold mt-2">4.2 Compliance with LinkedIn’s Terms</h2>
          <p>The Service is designed to extract and track only publicly available data from LinkedIn, including for keyword monitoring within posts, comments, and profiles visible to all users.You are solely responsible for ensuring your use, including keyword tracking, complies with LinkedIn’s TOS, which prohibits scraping (manual or automated) and unauthorized automation.<strong>DISCLAIMER: OutX does not condone or support violations of LinkedIn’s TOS. Any breach, including account suspension or legal action from LinkedIn, is your sole responsibility. Each LinkedIn Sales Navigator account may be linked to only one OutX Account.</strong></p>
          <h2 className="font-bold mt-2">4.3 Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className='list-inside list-disc'>
              <li><strong>Use the Service for illegal purposes</strong>, including spam, abusive messaging, or unauthorized keyword tracking (e.g., violating anti-spam laws like CAN-SPAM, GDPR, CCPA, or India’s IT Rules, 2021).</li>
              <li><strong>Reverse-engineer, decompile, modify, or attempt to circumvent security measures</strong> of the Service or its Chrome extension, except as permitted by law (e.g., India’s Copyright Act, 1957).</li>
              <li><strong>Share your OutX Account or credentials</strong> with others.</li>
              <li><strong>Extract or track data beyond what is publicly available on LinkedIn</strong> or permitted by LinkedIn’s TOS, including scraping private data (e.g., data behind login restrictions or not visible to all users) for keyword tracking or other purposes.</li>
              <li><strong>Overload, disrupt, or test vulnerabilities of the Service</strong>, including introducing viruses or malware, violating laws like India’s IT Act Sec. 43.</li>
              <li><strong>Use technology to copy or misuse the Service</strong>, extracted data, or keyword tracking results for unauthorized purposes.</li>
          </ul>

          <h2 className="font-bold mt-2">4.4 Liability for Scraping Private Data</h2>
          <p>The Service is engineered to scrape and track only publicly available LinkedIn data, including for keyword tracking. If you configure, modify, or misuse the Service—or use any other means—to scrape or track private, restricted, or non-public data (e.g., data requiring special access or not visible to all users), you are solely liable for all consequences, including legal claims, damages, or penalties from LinkedIn, affected parties, or regulators (e.g., under India’s DPDP Act Sec. 27, GDPR, CCPA, or the U.S. CFAA). <strong>DISCLAIMER: OutX explicitly prohibits such actions and disclaims all liability for your misuse.</strong></p>

          <h2 className="font-bold mt-2">4.5 GDPR Compliance (EU Users)</h2>
          <p>If you process personal data of EU residents:</p>
          <ul className='list-inside list-disc'>
              <li>You are the <strong>data controller</strong> under GDPR, deciding how and why data is processed, including for keyword tracking.</li>
              <li>OutX is a <strong>data processor</strong>, acting on your instructions.</li>
              <li>You must have a lawful basis (e.g., consent, legitimate interest) under GDPR Art. 6 and comply with transparency and data subject rights for all data processed, including keyword tracking results. Scraping or tracking private data without consent violates GDPR, and you bear full liability.</li>
          </ul>

          <h2 className="font-bold mt-2">4.6 CCPA Compliance (California Residents)</h2>
          <p>If you process personal information of California residents:</p>
          <ul className='list-inside list-disc'>
              <li>You are responsible for CCPA compliance, including disclosing data collection (e.g., from keyword tracking) and honoring consumer rights.</li>
              <li>OutX acts as a <strong>service provider</strong>, processing data on your behalf. Scraping or tracking private data may breach CCPA, and you are liable.</li>
          </ul>

          <h2 className="font-bold mt-2">4.7 DPDP Act Compliance (Indian Users)</h2>
          <p>If you process personal data of Indian residents:</p>
          <ul className='list-inside list-disc'>
              <li>You are the <strong>data fiduciary</strong> under the DPDP Act (Sec. 2(i)), responsible for lawful processing, including keyword tracking.</li>
              <li>OutX is a <strong>data processor</strong> (Sec. 2(j)), acting per your instructions.</li>
              <li>You must comply with the DPDP Act (Sec. 4-8), including obtaining explicit consent, providing notice, and ensuring purpose limitation for all data, including keyword tracking results. Scraping or tracking private data without consent violates the DPDP Act (e.g., Sec. 27 penalties), and you are solely liable.</li>
          </ul>

          <h2 className="font-bold mt-2">4.8 Other Jurisdictions</h2>
          <p>You must comply with all applicable local laws (e.g., privacy, consumer protection) in your jurisdiction, including when using keyword tracking. OutX is not responsible for your failure to adhere to such laws.</p>

          <h2 className="font-bold mt-2">4.9 Pooling Feature</h2>
          <p>The Service may include a pooling feature to enhance data extraction and keyword tracking by accessing your LinkedIn Sales Navigator account. By creating an Account, you consent to this feature. If you do not wish to participate, do not use the Service.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">5. Pricing and Payment</h4>
          <h2 className="font-bold mt-2">5.1 Freemium Model</h2>
          <p>OutX offers a freemium model: basic features (including limited keyword tracking) are free, premium features (e.g., advanced automation, email extraction, unlimited keyword tracking) require payment.</p>

          <h2 className="font-bold mt-2">5.2 Email Extraction Charges</h2>
          <p>You are charged only for valid, verified emails. We provide an estimated cost before extraction, and the final charge may be lower. Risky emails are free.</p>

          <h2 className="font-bold mt-2">5.3 Payment Terms</h2>
          <p>Payments are processed via a third-party provider (e.g., credit card, debit card, wire transfer). You authorize us to charge your payment method automatically, with charges possibly processed in groups or up to 10 days later. Fees are non-refundable except as outlined in Section 12, subject to local consumer laws (e.g., India’s Consumer Protection Act, 2019). Invoices are available in your Account’s billing portal.</p>

          <h2 className="font-bold mt-2">5.4 Changes to Pricing</h2>
          <p>We may adjust pricing with prior notice via email or our website. Continued use after changes indicates acceptance.</p>

          <h2 className="font-bold mt-2">5.5 Subscription Management</h2>
          <p>Canceling a plan ends access to remaining credits, including keyword tracking allowances, at the billing cycle’s end. Changing plans may forfeit rolled-over credits. You are responsible for overage charges beyond your plan’s credits.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">6. Data Extraction and Limits</h4>
          <h2 className="font-bold mt-2">6.1 Extraction and Tracking Limits</h2>
          <p>You may extract up to 2,500 leads per Sales Navigator search or saved list and track keywords within publicly available LinkedIn content, with unlimited daily scans, subject to LinkedIn’s fair use limits. Exceeding these may lead to suspension by LinkedIn, for which OutX is not liable.</p>

          <h2 className="font-bold mt-2">6.2 Data Ownership</h2>
          <p>You own the data you extract or track (e.g., CSV exports, keyword tracking reports), provided it complies with applicable laws (e.g., GDPR, CCPA, DPDP Act) and LinkedIn’s TOS. OutX claims no ownership but may use aggregated, non-personal data to improve the Service.</p>

          <h2 className="font-bold mt-2">6.3 Consent Requirement for Scraped or Tracked Data Use</h2>
          <p>You must obtain explicit consent from individuals whose data you extract or track (e.g., via LinkedIn messaging or other lawful means) before using it for outreach or other purposes, unless another lawful basis applies under GDPR (Art. 6), CCPA, or DPDP Act (Sec. 6). OutX provides the tool to extract and track public data but does not verify or secure consent on your behalf—you are solely responsible for compliance.</p>

          <h2 className="font-bold mt-2">6.4 Compliance with Local Laws</h2>
          <ul className="list-inside list-disc">
              <li><strong>EU Users</strong>: Ensure extracted and tracked data complies with GDPR. OutX deletes it post-session unless exported.</li>
              <li><strong>California Residents</strong>: Comply with CCPA. Scraping or tracking private data may violate CCPA.</li>
              <li><strong>Indian Users</strong>: Comply with the DPDP Act (e.g., Sec. 5 notice, Sec. 6 consent). Scraping or tracking private data may breach the Act.</li>
              <li><strong>Other Jurisdictions</strong>: Adhere to local data protection laws.</li>
          </ul>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">7. Intellectual Property</h4>
          <h2 className="font-bold mt-2">7.1 OutX Property</h2>
          <p>The Service, including its software, Chrome extension, design, branding, content, and keyword tracking functionality, is owned by OutX and protected by copyright, trademark, patent, and other intellectual property laws worldwide, including India’s Copyright Act, 1957 and Trademarks Act, 1999. You may not copy, distribute, modify, or create derivative works without our written consent. All rights not expressly granted remain with OutX.</p>

          <h2 className="font-bold mt-2">7.2 User Content</h2>
          <p>You retain ownership of content you generate (e.g., exported lead lists, keyword tracking reports), but grant OutX a non-exclusive, royalty-free, worldwide license to use, store, and process it solely to provide the Service. OutX may also use such data (excluding personal data) in aggregated form to enhance the Service.</p>

          <h2 className="font-bold mt-2">7.3 Feedback</h2>
          <p>Feedback you provide grants us a worldwide, royalty-free, perpetual license to use and incorporate it without compensation.</p>

          <h2 className="font-bold mt-2">7.4 Logo Use</h2>
          <p>By creating an Account, you grant OutX a perpetual, worldwide license to use your company name and logo for marketing purposes (e.g., listing you as a customer on our website). You may revoke this license by emailing <a href="mailto:support@outx.ai">support@outx.ai</a>; we will confirm receipt and act within 30 days.</p>

        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">8. Copyright Infringement</h4>
          <h2 className="font-bold mt-2">8.1 Policy</h2>
          <p>We respect copyright laws globally, including the U.S. DMCA, India’s Copyright Act, 1957, and similar laws. You may not use the Service, including keyword tracking, to infringe copyrights or other intellectual property rights.</p>
          <h2 className="font-bold mt-2">8.2 Reporting Infringement</h2>
          <p>If your copyright is infringed via the Service, send a notice to our Copyright Agent at:</p>
          <ul className='list-inside list-disc'>
            <li>Email: [support@outx.ai]</li>
            <li>Include: (1) your signature, (2) identification of the copyrighted work, (3) location of the infringing material, (4) your contact info, (5) good faith belief statement, (6) statement under penalty of perjury.</li>
          </ul>
          <p>We will investigate and remove proven infringing content within 30 working days or terminate repeat infringers’ access.</p>
          <h2 className="font-bold mt-2">8.3 Counter-Notices</h2>
          <p>If your content is removed and you believe it was a mistake, submit a counter-notice to [support@outx.ai] with similar details. We may reinstate content if unresolved after 10-14 business days (U.S. DMCA) or per local law.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">9. Privacy Policy (Including GDPR, CCPA, DPDP Act)</h4>
          <h2 className="font-bold mt-2">9.1 Data We Collect</h2>
          <p>We collect minimal data to operate the Service:</p>
          <ul className='list-disc list-inside'>
            <li><strong>Account Data:</strong>Email, payment info (via third-party processor).</li>
            <li><strong>Usage Data:</strong> Interactions with the Service (e.g., searches, exports, keyword tracking queries).</li>
            <li><strong>Device Data:</strong> IP address, browser type, collected via cookies (see Cookie Policy).</li>
            <li><strong>No LinkedIn Credentials:</strong>We do not store your LinkedIn login details.</li>
          </ul>
          <p>For EU users, this is based on contract performance (GDPR Art. 6(1)(b)) and legitimate interest (GDPR Art. 6(1)(f)). For Indian users, it aligns with the DPDP Act (Sec. 4). For California residents, it meets CCPA’s “business purpose.”</p>
          <h2 className="font-bold mt-2">9.2 Purposes of Data Processing</h2>
          <p>We use your data to:</p>
          <ul className='list-disc list-inside'>
            <li>Provide and improve the Service (e.g., process payments, extract leads, track keywords). </li>
            <li>Analyze usage for optimization (e.g., via analytics cookies).</li>
            <li>Comply with legal obligations (e.g., tax records, India’s DPDP Act Sec. 8).</li>
            <li>Aggregate non-personal data to enhance Service functionality.</li>
          </ul>
          <h2 className="font-bold mt-2">9.3 Consent for Scraped or Tracked Data Use</h2>
          <p>OutX does not process scraped or tracked LinkedIn data beyond facilitating its extraction, tracking, and export. You must obtain explicit consent from data subjects before using extracted or tracked data (e.g., for outreach), as required by GDPR (Art. 6(1)(a)), DPDP Act (Sec. 6), or other laws. OutX provides no mechanism to secure this consent—you are solely responsible.</p>
          <h2 className="font-bold mt-2">9.4 Data Subject Rights (GDPR - EU Users)</h2>
          <p>EU users have GDPR rights to:</p>
          <ul>
            <li>Access, rectify, or erase your personal data, including keyword tracking data.</li>
            <li>Restrict or object to processing.</li>
            <li>Data portability.</li>
            <li>Withdraw consent (e.g., for cookies).</li>
          </ul>
          <p>Contact [support@outx.ai]; response within 30 days.</p>
          <h2 className="font-bold mt-2">9.5 Consumer Rights (CCPA - California Residents)</h2>
          <p>California residents have CCPA rights to:</p>
          <ul className='list-disc list-inside'>
            <li><strong>Know:</strong> Disclosure of personal information collected (categories: identifiers, commercial info; sources: you, cookies, keyword tracking; purposes: service delivery).</li>
            <li><strong>Delete:</strong> Deletion of personal information we hold.</li>
            <li><strong>Opt-Out: </strong>Opt-out of “sales” (we do not sell data per CCPA).</li>
            <li><strong>Non-Discrimination:</strong>No discrimination for exercising rights.
            Submit requests at [support@outx.ai] or [1-800-XXX-XXXX]. Response within 45 days (extendable by 45 more). No sales in the past 12 months.</li>
          </ul>
          <h2 className="font-bold mt-2">9.6 Data Rights (DPDP Act - Indian Users)</h2>
          <p>Indian users have DPDP Act rights (Sec. 11-13):</p>
          <ul className='list-disc list-inside'>
              <li><strong>Access</strong>: Summary of personal data processed and activities, including keyword tracking.</li>
              <li><strong>Correction</strong>: Rectify inaccurate or incomplete data.</li>
              <li><strong>Erasure</strong>: Request deletion when consent is withdrawn or purpose is fulfilled.</li>
              <li><strong>Nominate</strong>: Designate a nominee for data management in case of incapacity or death.</li>
              <li><strong>Withdraw Consent</strong>: Revoke consent for non-essential processing (e.g., cookies, marketing).</li>
              <li><strong>Grievance Redressal</strong>: Lodge complaints with us or the Data Protection Board (once established).</li>
          </ul>
          <p>Submit requests at <a href="mailto:support@outx.ai">support@outx.ai</a>; response within 30 days or per DPDP Act rules.</p>

          <h2 className="font-bold mt-2">9.7 Other Jurisdictions</h2>
          <p>Users in other countries have rights under local laws (e.g., Canada’s PIPEDA). Contact us to exercise these rights.</p>

          <h2 className="font-bold mt-2">9.8 Data Retention</h2>
          <p>Account and usage data (including keyword tracking queries) are retained as necessary for the Service or legal obligations (e.g., 7 years for tax records under India’s DPDP Act Sec. 8(7)). Scraped and tracked LinkedIn data is deleted post-session unless exported by you. Post-account deletion, personal data is destroyed within 30 days; if not deleted, it is retained for 3 years from extraction or tracking, then destroyed, unless anonymized or legally required to be retained.</p>

          <h2 className="font-bold mt-2">9.9 Third-Party Sharing</h2>
          <p>We share data only with processors (e.g., payment providers, analytics tools, hosting services like Bubble or Heroku) under GDPR-, CCPA-, and DPDP Act-compliant agreements (Sec. 7). Keyword tracking may involve sub-processors for processing public LinkedIn data. We do not sell personal data. Sub-processors are listed at <a href="http://outx.ai/subprocessors">outx.ai/subprocessors</a> and updates are emailed; you may object within 30 days on reasonable data protection grounds, potentially leading to termination without refund.</p>

          <h2 className="font-bold mt-2">9.10 Server Locations and Data Flows</h2>
          <p>OutX servers are located in the United States. Data collected (e.g., account data, usage data, keyword tracking queries) is transferred to and processed on these servers. For EU users, transfers comply with GDPR Art. 46 via Standard Contractual Clauses (SCCs) (Module Four: Processor-to-Controller; governed by California law, disputes in San Francisco courts); for Indian users, transfers align with DPDP Act Sec. 16 (pending rules); for California users, CCPA applies. Scraped and tracked LinkedIn data is not stored by OutX beyond your session—it is exported to your device. You are responsible for any onward transfers of exported data.</p>

          <h2 className="font-bold mt-2">9.11 Data Protection Officer</h2>
          <p>Contact our Data Protection Officer at <a href="mailto:support@outx.ai">support@outx.ai</a> for GDPR/DPDP Act inquiries.</p>

          <h2 className="font-bold mt-2">9.12 Security</h2>
          <p>We implement technical and organizational measures to protect your data, including keyword tracking data, from unauthorized access, loss, or alteration. In case of a security incident, we will notify you without undue delay and take steps to mitigate it, per GDPR Art. 33, DPDP Act Sec. 8, and CCPA.</p>

          <h2 className="font-bold mt-2">9.13 Audit Rights</h2>
          <p>You may audit our data practices, including keyword tracking processes, once per 12 months with 30 days’ notice, during business hours, at your cost, unless required by a data protection authority or post-security incident. We may charge for time spent assisting.</p>

        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">10. Cookie Policy</h4>
          <h2 className="font-bold mt-2">10.1 What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device by our website or Chrome extension to enhance functionality and analyze usage.</p>

        <h2 className="font-bold mt-2">10.2 Types of Cookies We Use</h2>
        <ul className='list-disc list-inside'>
            <li><strong>Essential Cookies</strong>: Required for functionality (e.g., session management, keyword tracking settings). No consent needed (GDPR Art. 6(1)(b), DPDP Act Sec. 4).</li>
            <li><strong>Analytics Cookies</strong>: Track usage (e.g., page visits, keyword tracking frequency) to improve the Service. Consent required for EU/Indian users (GDPR Art. 6(1)(a), DPDP Act Sec. 6); opt-in via cookie banner.</li>
            <li><strong>No Marketing Cookies</strong>: We do not use cookies for advertising.</li>
        </ul>

        <h2 className="font-bold mt-2">10.3 Cookie Management</h2>
        <ul className='list-disc list-inside'>
            <li><strong>EU/Indian Users</strong>: Accept or decline non-essential cookies via our banner. Withdraw consent at <a href="http://outx.ai/cookies">outx.ai/cookies</a>.</li>
            <li><strong>California Residents</strong>: Cookies are not “sold” under CCPA; disable them in your browser.</li>
            <li><strong>Retention</strong>: Essential cookies expire at session end; analytics cookies last up to 12 months.</li>
        </ul>

        <h2 className="font-bold mt-2">10.4 Third-Party Cookies</h2>
        <p>We may use third-party analytics (e.g., Google Analytics) with GDPR/CCPA/DPDP Act-compliant settings (e.g., IP anonymization) to analyze keyword tracking usage.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">11. Damage and Liability</h4>
          <h2 className="font-bold mt-2">11.1 User Liability</h2>
          <p>You are liable for damages caused by your misuse of the Service, including:</p>
          <ul className='list-disc list-inside'>
              <li>Violating LinkedIn’s TOS through extraction or keyword tracking.</li>
              <li>Scraping or tracking private or restricted data, breaching laws like GDPR, CCPA, DPDP Act Sec. 27 (up to ₹250 crore penalty), India’s IT Act Sec. 66, or the U.S. CFAA.</li>
              <li>Infringing intellectual property or privacy rights.</li>
          </ul>
          <p>You agree to indemnify, defend, and hold OutX, its affiliates, and their officers, employees, and agents harmless from claims, losses, or damages (including legal fees) arising from your actions, including unauthorized scraping or tracking of private data.</p>

          <h2 className="font-bold mt-2">11.2 OutX Liability</h2>
          <p>To the fullest extent permitted by law, OutX is not liable for indirect, incidental, special, consequential, or punitive damages (e.g., lost profits, data loss) from your use of the Service, including damages from your scraping or tracking of private data or LinkedIn downtime. Our total liability is capped at the amount you paid us in the prior 12 months or $100, whichever is less. Statutory rights in the EU (GDPR), California (CCPA), India (DPDP Act), and other jurisdictions are not affected.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">12. Refunds</h4>
          <h2 className="font-bold mt-2">12.1 Refund Policy</h2>
          <p>Fees are non-refundable except:</p>
          <ul className='list-disc list-inside'>
              <li><strong>Technical Issues</strong>: If the Service, including keyword tracking, fails due to our error, request a refund within 14 days at <a href="mailto:support@outx.ai">support@outx.ai</a>.</li>
              <li><strong>Legal Rights</strong>: EU users have a 14-day withdrawal right under EU consumer law (unless Service use begins); Indian users have rights under the Consumer Protection Act, 2019 and DPDP Act Sec. 17; California users retain CCPA refund rights.</li>
              <li><strong>Overcharges</strong>: Refunds for billing errors processed within 30 days.</li>
          </ul>
          <p>Unused credits, including for keyword tracking, roll over to the next period only with renewal.</p>

          <h2 className="font-bold mt-2">12.2 Process</h2>
          <p>Submit refund requests with proof of purchase and issue details. Approved refunds are issued to your original payment method.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">13. Marketing</h4>
          <h2 className="font-bold mt-2">13.1 OutX Marketing</h2>
          <p>We may use your email to send Service updates, promotional offers, or newsletters, including about keyword tracking features. EU/Indian users must opt-in (GDPR Art. 6(1)(a), DPDP Act Sec. 6); California users may opt-out per CCPA. Unsubscribe via email links or [support@outx.ai].</p>
          <h2 className="font-bold mt-2">13.2 User Marketing</h2>
          <p>You may use the Service, including keyword tracking data, for outreach, but must comply with anti-spam laws (e.g., CAN-SPAM, GDPR, India’s IT Rules, 2021, DPDP Act Sec. 5) and LinkedIn’s TOS. OutX is not liable for your marketing activities.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">14. Support</h4>
          <h2 className="font-bold mt-2">14.1 Availability</h2>
          <p>Support is available at [support@outx.ai]. We aim to respond to chat inquiries as soon as possible and email inquiries within 3 business days, subject to staff availability, including for keyword tracking issues.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">15. User Compliance</h4>
          <h2 className="font-bold mt-2">15.1 Compliance Monitoring</h2>
          <p>OutX may monitor usage to detect egregious violations (e.g., excessive scraping or tracking attempts) and reserves the right to suspend accounts to protect the Service and its users, with notice where feasible.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">16. Disclaimer of Warranties</h4>
          <p>The Service is provided “as is” without warranties, express or implied (e.g., merchantability, fitness for purpose), except as required by law (e.g., India’s Consumer Protection Act, 2019, DPDP Act Sec. 17). DISCLAIMER: OutX does not guarantee uninterrupted or error-free operation, compatibility with LinkedIn, accuracy of keyword tracking results, or protection from LinkedIn penalties due to your use. You assume all risks of using the Service. We use reasonable efforts to minimize downtime due to maintenance or bugs, but are not liable for interruptions or their business impact.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">17. Termination</h4>
          <h2 className="font-bold mt-2">17.1 By You</h2>
          <p>Uninstall the extension and delete your Account to terminate use, ending these Terms without compensation.</p>
          <h2 className="font-bold mt-2">17.2 By Us</h2>
          <p>We may suspend or terminate your access for violating these Terms, LinkedIn’s TOS, or applicable law (e.g., scraping or tracking private data under DPDP Act Sec. 27), with 10 days’ notice where feasible, per India’s IT Act Sec. 69A if required.</p>
          <h2 className="font-bold mt-2">17.3 Effect of Termination</h2>
          <p>Your license ends upon termination. IP, liability, confidentiality, and governing law provisions survive. Data, including keyword tracking results, will be deleted per GDPR, CCPA, DPDP Act Sec. 8(7), or other local laws unless legally required to retain. </p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">18. Governing Law and Dispute Resolution</h4>
          <p>These Terms are governed by the laws of the State of California, USA, except where local laws mandate otherwise (e.g., GDPR for EU users, DPDP Act for Indian users, CCPA for California residents). Disputes will be resolved in state or federal courts in San Francisco County, California, unless local law requires jurisdiction elsewhere (e.g., India’s courts per DPDP Act Sec. 19). EU users may use the EU Online Dispute Resolution platform (http://ec.europa.eu/odr); Indian users may approach the Data Protection Board or consumer forums.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">19. Changes to These Terms</h4>
          <p>We may update these Terms, notifying you via email or our website. Changes take effect upon posting or as required by local law (e.g., 30 days’ notice under India’s DPDP Act Sec. 18). Continued use signifies acceptance.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">20. Jurisdiction-Specific Addenda</h4>
          <h2 className="font-bold mt-2">20.1 European Union (GDPR)</h2>
          <ul className='list-disc list-inside'>
            <li><span>Consent:</span> You must obtain explicit consent for processing scraped or tracked data unless another lawful basis applies (Art. 6). OutX acts as a processor and does not secure consent (Sec. 6.3).</li>
            <li><span>Data Transfers:</span> Transfers to U.S. servers use Standard Contractual Clauses (Art. 46) (Sec. 9.10).</li>
            <li><span>Rights:</span>EU-specific rights are detailed in Sec. 9.4, with support at [support@outx.ai].</li>
          </ul>
          <h2 className="font-bold mt-2">20.2 India (DPDP Act)</h2>
          <ul className='list-disc list-inside'>
            <li><span>Consent:</span>
            Explicit consent is required for processing scraped or tracked data, with notice per Sec. 5-6. OutX does not obtain consent—you must (Sec. 6.3).
            </li>
            <li><span>Data Transfers: </span>Cross-border transfers to U.S. servers are subject to DPDP Act Sec. 16 (rules TBD) (Sec. 9.10).
            </li>
            <li><span>Rights:</span>
            Indian-specific rights (Sec. 11-13) are in Sec. 9.6, with support at [support@outx.ai].
            </li>
            <li><span>Penalties:</span>
            Misuse (e.g., private data scraping or tracking) may incur penalties up to ₹250 crore (Sec. 27), your sole liability (Sec. 11.1).
            </li>
          </ul>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">21. Additional Provisions</h4>
          <h2 className="font-bold mt-2">21.1 Force Majeure</h2>
          <p>Neither party is liable for delays or non-performance due to events beyond reasonable control (e.g., natural disasters, LinkedIn service outages affecting keyword tracking). Notify the other party promptly; if unresolved after 3 months, either may terminate these Terms.</p>
          <h2 className="font-bold mt-2">21.2 Confidentiality</h2>
          <p>We will protect your confidential information (e.g., Account data, usage details, keyword tracking settings) with reasonable measures and disclose it only to staff or sub-processors needing it to provide the Service.This obligation lasts 5 years post-termination, except for info that is public, previously known, or legally required to be disclosed.</p>
          <h2 className="font-bold mt-2">21.3 Entire Agreement</h2>
          <p>These Terms are the complete agreement between you and OutX, superseding any prior terms or understandings.
          </p>
          <h2 className="font-bold mt-2">21.4 Severability</h2>
          <p>If any provision is found invalid by a court, it will be interpreted to reflect the original intent as closely as possible, and the remaining provisions remain in effect.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">22. Contact Us</h4>
          <p>Reach us at: support@outx.ai</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left space-y-6">
          <h4 className="font-bold text-lg">Key Changes for Keyword Tracking</h4>
          <ol className='list-inside list-decimal'>
            <li><strong>Section 1:</strong> Added keyword tracking as a core feature, emphasizing it’s limited to public LinkedIn data.
            </li>
            <li><strong>Section 3: </strong>Included keyword tracking in the license scope.</li>
            <li><strong>Section 4:</strong> Extended responsibilities and disclaimers to cover keyword tracking, ensuring compliance with LinkedIn’s TOS and laws.</li>
            <li><strong>Section 5: </strong>Integrated keyword tracking into the freemium model and subscription terms.</li>
            <li><strong>Section 6:</strong> Added keyword tracking limits and reports to extraction rules and ownership.</li>
            <li><strong>Section 7:</strong>Protected keyword tracking functionality under IP and included reports in user content.</li>
            <li><strong>Section 9:</strong>Updated data collection, purposes, rights, retention, and sharing to include keyword tracking data.</li>
            <li><strong>Section 10:</strong>Added keyword tracking to cookie usage.</li>
            <li><strong>Section 11-17:</strong>Extended liability, refunds, support, disclaimers, and termination to cover keyword tracking misuse or issues.</li>
            <li><strong>Section 20:</strong>Updated jurisdiction addenda to reflect keyword tracking consent requirements.</li>
            <li><strong>Section 21:</strong> Included keyword tracking settings in confidentiality.</li>
          </ol>
          <p>This ensures keyword tracking is fully integrated, legally sound, and consistent with OutX’s public-data-only approach, mirroring Brand24’s functionality but scoped to LinkedIn. Let me know if you need further adjustments!</p>
        </div>

        <hr className='my-6'/>
      </div>
      <Footer/>
    </>
  );
}

export default TermsOfService;
