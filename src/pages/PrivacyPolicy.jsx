import React from 'react';
import Header from "../components/Header.jsx";
import Footer from '../components/Footer.jsx';
import Meta from "../helper/Meta.jsx"

function PrivacyPolicy() {
  return (
    <>
     <Meta 
      title="Outx.ai Privacy Policy" 
      description="Learn how Outx.ai collects, uses, and protects your data while using our LinkedIn scraping and tracking services." 
      keywords="Outx.ai privacy policy, LinkedIn scraping privacy, Outx.ai data protection" 
    />
      <Header />
      <div className="w-full max-w-[1800px] py-20 text-center mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 lg:py-20 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:pt-10 pt-4">Privacy Policy
        </h1>
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 pt-4">Updated on March 13, 2025.</h3>
        <div className="text-left pt-10 space-y-6">
          <p>
          Welcome to OutX.ai! This Privacy Policy explains how OutX.ai ("OutX," "we," "us," or "our") collects, uses, shares, and protects your personal data when you use our website, Chrome extension, and related services (collectively, the “Service”).  The Service helps you extract publicly available LinkedIn data (e.g., names, job titles, emails), track keywords on LinkedIn, and automate outreach, all in compliance with applicable laws and LinkedIn’s Terms of Service (TOS).
          </p>
          <p>
          We’re committed to safeguarding your privacy while providing a powerful tool for sales professionals, recruiters, and marketers. This policy complies with laws like the General Data Protection Regulation (GDPR) in the EU, the California Consumer Privacy Act (CCPA), India’s Digital Personal Data Protection Act, 2023 (DPDP Act), and other jurisdictions’ regulations. Please read this carefully. By using the Service, you agree to this Privacy Policy and our Terms of Service.
          </p>
        </div>

        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
          <h4 className="font-bold text-lg">1. Our Role and Your Responsibilities</h4>
          <ul className='list-disc list-inside'>
            <li><strong>OutX as a Data Processor:</strong>We process personal data on your behalf to provide the Service (e.g., extracting LinkedIn data, tracking keywords). Under GDPR, we’re a data processor; under the DPDP Act, we’re a data processor (Sec. 2(j)); under CCPA, we’re a service provider. We don’t decide how or why data is used—that’s up to you.</li>
            <li><strong>You as a Data Controller/Fiduciary: </strong>When you use the Service to extract or track data (e.g., emails for personalized outreach), you’re the data controller (GDPR), data fiduciary (DPDP Act, Sec. 2(i)), or the entity responsible under CCPA. You must ensure your use complies with all applicable laws, including obtaining consent where required.</li>
          </ul>
        </div>

        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
        <h3 className="font-bold text-2xl">2. Data We Collect</h3>
          <p>We collect minimal data to operate the Service effectively:</p>
          <h4 className="font-bold text-lg">2.1 Data You Provide
          </h4>
          <ul>
            <li><strong>Account Data:</strong> When you create an Account, we collect your email address (including when you sign up via Google or Outlook) and payment information (processed via a third-party provider).</li>
            <li><strong>Keyword Tracking Queries:</strong>  Keywords you input to monitor LinkedIn content (e.g., brand names, topics).</li>
            <li><strong>Dispute/Legal Data: </strong>Any information relevant to disputes or legal proceedings affecting us.</li>
          </ul>
          <h4 className="font-bold text-lg">2.2 Data We Collect Automatically
          </h4>
          <ul>
            <li><span>Usage Data:</span> Interactions with the Service, like searches, exports, and keyword tracking frequency, to improve functionality.</li>
            <li><span>Device Data:</span> IP address, browser type, operating system, and similar info collected via cookies (see Section 8).</li>
          </ul>
          <h4 className="font-bold text-lg">2.3 LinkedIn Data We Process (Not Store)
          </h4>
          <ul>
            <li><span>Extracted Data:</span> Publicly available LinkedIn data you extract (e.g., names, job titles, company details, emails) and keyword tracking results (e.g., mentions in posts or profiles). We facilitate extraction and tracking but don’t store this data beyond your session unless you export it.</li>
            <li><span>No LinkedIn Credentials:</span> We don’t collect or store your LinkedIn login details—you provide access via your own account.</li>
          </ul>
        </div>

        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
          <h3 className="font-bold text-2xl">3. How We Use Your Data</h3>
          <p>We use your data to:</p>
          <ul className='list-disc list-inside'>
            <li><strong>Provide the Service:</strong> Process your Account, extract LinkedIn data, track keywords, and enable exports or outreach automation.</li>
            <li><strong>Improve the Service:</strong> Analyze usage (e.g., via analytics cookies) to optimize features like keyword tracking or data extraction.</li>
            <li><strong>Communicate:</strong>Send Service updates, respond to support requests at [support@outx.ai], or, with your consent, share promotional offers.</li>
            <li><strong>Comply with Laws: </strong>Retain data as required (e.g., tax records for 7 years under India’s DPDP Act Sec. 8(7)).</li>
            <li><strong>Aggregate Data: </strong>Use non-personal, aggregated data (e.g., usage trends) to enhance the Service, excluding personal LinkedIn data.</li>
            <li><strong>Defend Our Rights: </strong>Use dispute/legal data to protect our interests in proceedings (based on legitimate interest).</li>
          </ul>
          <h2 className="font-bold text-lg">Legal Bases (GDPR, DPDP Act)</h2>
          <ul className="list-disc list-inside">
            <li><strong>Contract</strong>: To fulfill our agreement with you (GDPR Art. 6(1)(b), DPDP Act Sec. 4).</li>
            <li><strong>Legitimate Interest</strong>: To improve the Service, ensure security, and defend our rights (GDPR Art. 6(1)(f)).</li>
            <li><strong>Consent</strong>: For non-essential cookies or marketing emails (GDPR Art. 6(1)(a), DPDP Act Sec. 6).</li>
            <li><strong>Legal Obligation</strong>: To meet regulatory requirements (GDPR Art. 6(1)(c)).</li>
          </ul>
        </div>

        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
          <h3 className="font-bold text-2xl">4. Your Use of Extracted or Tracked Data</h3>
          <p>You’re responsible for how you use data extracted or tracked via the Service (e.g., emails for personalized outreach, keyword tracking reports). This includes:</p>
          <ul className="list-disc list-inside">
            <li><strong>Obtaining Consent</strong>: You must secure explicit consent from individuals before using their data (e.g., for email campaigns), unless another lawful basis applies (GDPR Art. 6, DPDP Act Sec. 6, CCPA).</li>
            <li><strong>Compliance</strong>: Adhere to LinkedIn’s TOS and laws like CAN-SPAM, GDPR, CCPA, and India’s IT Rules, 2021. We don’t verify consent or compliance—that’s on you.</li>
            <li><strong>Example</strong>: If you extract an email and send a personalized message, you must ensure it’s lawful (e.g., with consent or opt-out options).</li>
          </ul>
        </div>
        
        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
          <h3 className="font-bold text-2xl">5. Data Sharing</h3>
          <p>We share data only as necessary:</p>
          <ul className="list-disc list-inside">
            <li><strong>(a)</strong> With trusted providers (e.g., payment processors, hosting services like Bubble or Heroku, analytics tools) under strict agreements compliant with GDPR Art. 28, CCPA, and DPDP Act Sec. 7. See our sub-processor list at <a href="http://outx.ai/subprocessors">outx.ai/subprocessors</a>.</li>
            <li><strong>(b)</strong> If required by law, court order, or to protect our rights, with any competent law enforcement body, regulatory agency, or court.</li>
            <li><strong>(c)</strong> To auditors, advisors, or legal agents for business purposes, under confidentiality agreements.</li>
            <li><strong>(d)</strong> To potential buyers during a merger or sale, restricted to purposes in this Policy.</li>
            <li><strong>(e)</strong> With your prior consent to others.</li>
            <li><strong>No Sales</strong>: We don’t sell your personal data under CCPA or any other definition.</li>
          </ul>
        </div>

        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
          <h3 className="font-bold text-2xl">6. Data Retention</h3>
          <ul className="list-disc list-inside">
            <li><strong>Account & Usage Data</strong>: Kept as long as your Account is active or needed for the Service (e.g., support). Post-deletion, destroyed within 30 days; if not deleted, retained for 3 years from last use, then destroyed, unless legally required (e.g., 7 years for tax records). If deletion is delayed (e.g., due to backup archives), we’ll securely store and isolate your data until deletion is possible.</li>
            <li><strong>Extracted/Tracked LinkedIn Data</strong>: Deleted after your session unless exported. Exported data (e.g., CSV files) is stored on your device—we don’t retain it.</li>
            <li><strong>Anonymized Data</strong>: We may keep aggregated, non-identifiable data indefinitely for Service improvement.</li>
          </ul>
        </div>

        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
          <h3 className="font-bold text-2xl">7. Data Transfers</h3>
          <ul className="list-disc list-inside">
            <li><strong>Server Location</strong>: Our servers are in the United States. Data (e.g., Account data, usage data, keyword queries) is transferred there.</li>
            <li><strong>Safeguards</strong>:
              <ul className="list-disc pl-5">
                <li><strong>EU Users</strong>: Transfers use <strong>Standard Contractual Clauses (SCCs)</strong> (Module Four: Processor-to-Controller, governed by California law, disputes in San Francisco courts) per GDPR Art. 46.</li>
                <li><strong>Indian Users</strong>: Transfers align with DPDP Act Sec. 16 (pending rules).</li>
                <li><strong>Other Jurisdictions</strong>: Compliant with local laws where applicable.</li>
              </ul>
            </li>
            <li><strong>Your Exports</strong>: You’re responsible for any onward transfers of exported data (e.g., emails, tracking reports).</li>
            <li><strong>Further Details</strong>: Contact <a href="mailto:support@outx.ai" className="text-gray-500">support@outx.ai</a> for more information on transfer safeguards.</li>
          </ul>
        </div>

        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
        <h3 className="font-bold text-2xl">8. Cookies</h3>
        
        <h4 className="text-lg font-bold">8.1 What We Use</h4>
        <ul className="list-disc list-inside">
          <li><strong>Essential Cookies</strong>: For functionality (e.g., session management, keyword tracking settings). No consent needed (GDPR Art. 6(1)(b)).</li>
          <li><strong>Analytics Cookies</strong>: To track usage (e.g., page visits, extraction frequency). Consent required for EU/Indian users (GDPR Art. 6(1)(a), DPDP Act Sec. 6).</li>
        </ul>

        <h4 className="text-lg font-bold">8.2 Management</h4>
        <ul className="list-disc list-inside">
          <li><strong>EU/Indian Users</strong>: Opt-in via our cookie banner at <a href="http://outx.ai/cookies" className="text-gray-500">outx.ai/cookies</a>. Withdraw consent anytime there.</li>
          <li><strong>California Users</strong>: No “sale” under CCPA; disable in your browser.</li>
          <li><strong>Retention</strong>: Essential cookies expire at session end; analytics up to 12 months.</li>
        </ul>

        <h4 className="text-lg font-bold">8.3 Third-Party Cookies</h4>
        <p>We may use tools like Google Analytics with IP anonymization for compliance.</p>
        </div>

        <hr className='my-6'/>

        <div className="text-left pt-10 space-y-6">
        <h3 className="font-bold text-2xl">9. Your Rights</h3>
        
        <h4 className="text-lg font-bold">9.1 GDPR (EU Users)</h4>
        <ul className="list-disc list-inside">
          <li>Access, rectify, erase, restrict, or object to processing your data.</li>
          <li>Request data portability.</li>
          <li>Withdraw consent (e.g., for cookies).</li>
          <li><strong>Opt out of marketing emails</strong> by clicking ‘unsubscribe’ in our emails or emailing <a href="mailto:support@outx.ai" className="text-gray-500">support@outx.ai</a>.</li>
          <li>Contact us at <a href="mailto:support@outx.ai" className="text-gray-500">support@outx.ai</a>; response within 30 days.</li>
        </ul>

        <h4 className="text-lg font-bold">9.2 CCPA (California Residents)</h4>
        <ul className="list-disc list-inside">
          <li><strong>Know</strong>: We collect identifiers (e.g., email, IP), commercial info (e.g., payment data), usage data; sources: you, cookies; purpose: Service delivery.</li>
          <li><strong>Delete</strong>: Request deletion of data we hold.</li>
          <li><strong>Opt-Out</strong>: No data sales occur.</li>
          <li><strong>Non-Discrimination</strong>: Exercising rights won’t affect Service access.</li>
          <li>Submit requests at <a href="mailto:support@outx.ai" className="text-gray-500">support@outx.ai</a> or call <strong>1-800-XXX-XXXX</strong>; response within 45 days (extendable by 45).</li>
        </ul>

        <h4 className="text-lg font-bold">9.3 DPDP Act (Indian Users)</h4>
        <ul className="list-disc list-inside">
          <li>Access a summary of your data and processing activities.</li>
          <li>Correct or erase inaccurate/incomplete data.</li>
          <li>Withdraw consent for non-essential processing (e.g., marketing).</li>
          <li>Nominate someone to manage your data if incapacitated.</li>
          <li>File grievances with us or the Data Protection Board (once established).</li>
          <li>Contact <a href="mailto:support@outx.ai" className="text-gray-500">support@outx.ai</a>; response within 30 days or per DPDP rules.</li>
        </ul>

        <h4 className="text-lg font-bold">9.4 Other Jurisdictions</h4>
        <p>Rights under local laws (e.g., PIPEDA in Canada) apply. Contact us to exercise them.</p>
      </div>

      <hr className='my-6'/>

      <div className="text-left pt-10 space-y-6">
        <h3 className="font-bold text-2xl">10. Security</h3>
        <ul className="list-disc list-inside">
          <li>We use industry-standard measures (e.g., encryption, access controls) to protect your data from unauthorized access, loss, or alteration.</li>
          <li><strong>You’re responsible for keeping your data accurate and current</strong> by notifying us of changes (e.g., new email) at <a href="mailto:support@outx.ai" className="text-gray-500">support@outx.ai</a>.</li>
          <li>If a breach occurs, we’ll notify you without undue delay and mitigate it, per GDPR Art. 33, DPDP Act Sec. 8, and CCPA.</li>
        </ul>
    </div>

    <hr className='my-6'/>
    <div className="text-left pt-10 space-y-6">
        
  <h3 className="font-bold text-2xl">11. Children’s Privacy</h3>
  <p>The Service is for users 18+ only. We don’t knowingly collect data from children under 18 (or the age of majority in your jurisdiction). If we learn of such data, we’ll delete it promptly.</p>
</div>

<hr className='my-6'/>
    <div className="text-left pt-10 space-y-6">
  <h3 className="font-bold text-2xl">12. Changes to This Policy</h3>
  <p>We may update this Privacy Policy, notifying you via email or <a href="http://outx.ai/privacy" className="text-gray-500">outx.ai/privacy</a>. Changes take effect upon posting or as required by law (e.g., 30 days’ notice under DPDP Act Sec. 18). Continued use means acceptance.</p>
</div>

<hr className='my-6'/>
    <div className="text-left pt-10 space-y-6">
  
  <h3 className="font-bold text-2xl">13. Third-Party Links</h3>
  <p><strong>Our site may link to third-party websites with their own privacy policies.</strong> We’re not responsible for their practices; use them at your own risk.</p>
</div>

<hr className='my-6'/>
    <div className="text-left pt-10 space-y-6">
  
  <h3 className="font-bold text-2xl">14. Contact Us</h3>
  <p><strong>General Inquiries</strong>: <a href="mailto:support@outx.ai" className="text-gray-500">support@outx.ai</a></p>
</div>

<hr className='my-6'/>

      </div>
      <Footer/>
    </>
  );
}

export default PrivacyPolicy;
