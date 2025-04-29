import React, { useState } from "react";

function Accordion() {
  const [accordions, setAccordions] = useState([
    {
      key: 1,
      title: "What is the OutX.ai Affiliate Program?",
      data: "The OutX.ai Affiliate Program allows individuals and organizations to earn commissions by referring new customers to OutX.ai’s products and services. Affiliates promote our offerings through unique referral links and earn a percentage of the sales made through those links.",
      isOpen: false,
    },
    {
      key: 2,
      title: "How does the OutX.ai Affiliate Program work?",
      data: "After joining the program, you’ll receive a unique referral link. When someone clicks on your link and makes a purchase on OutX.ai, you earn a commission on that sale.",
      isOpen: false,
    },
    {
      key: 3,
      title: "How do I join the OutX.ai Affiliate Program?",
      data: "To join, sign up through our affiliate platform. Once your application is approved, you’ll gain access to your affiliate dashboard, where you can generate referral links and access promotional materials.",
      isOpen: false,
    },
    {
      key: 4,
      title: "Does it cost anything to become an affiliate?",
      data: "No, joining the OutX.ai Affiliate Program is free. There are no monthly charges or minimum sales requirements.",
      isOpen: false,
    },
    {
      key: 5,
      title: "How much can I earn as an affiliate?",
      data: "Earnings depend on the number of referrals and the commission rate. Our program offers competitive commissions, and your earnings grow with the number of successful referrals you make.",
      isOpen: false,
    },
    {
      key: 6,
      title: "How and when do I get paid?",
      data: "Commissions are processed monthly, typically 45 days after the end of the month in which the sale was made. Payments are made through [specified payment methods], and you’ll need to provide the necessary payment details in your affiliate account.",
      isOpen: false,
    },
    {
      key: 7,
      title: "Are there any requirements to join the program?",
      data: "We welcome affiliates with websites, blogs, or social media profiles that align with our brand values. However, we reserve the right to decline applications from sites containing objectionable material, including but not limited to defamatory content or adult material.",
      isOpen: false,
    },
    {
      key: 8,
      title: "Can I promote OutX.ai on multiple platforms?",
      data: "Yes, you’re encouraged to promote OutX.ai across various platforms, including websites, blogs, and social media profiles. The more visibility your referral links have, the higher your potential earnings.",
      isOpen: false,
    },
    {
      key: 9,
      title: "Where can I find promotional materials?",
      data: "Once approved, you’ll have access to a range of promotional materials, including banners and pre-designed ads, in your affiliate dashboard.",
      isOpen: false,
    },
    {
      key: 10,
      title: "Who can I contact for support regarding the affiliate program?",
      data: "If you have additional questions or need assistance, please contact our team at support@outx.ai",
      isOpen: false,
    },
  ]);

  const toggleAccordion = (accordionKey) => {
    setAccordions((prev) =>
      prev.map((accord) =>
        accord.key === accordionKey
          ? { ...accord, isOpen: !accord.isOpen }
          : { ...accord, isOpen: false }
      )
    );
  };

  return (
    <div className="w-full py-12 lg:py-2 sm:py-16">
        <h3 className="text-center font-bold lg:text-4xl text-3xl mb-6 lg:mb-10">FREQUENTLY ASKED QUESTIONS</h3>
        {accordions.map((accord) => (
          <div key={accord.key} className="mb-4 rounded-md shadow-md">
            <button
              className="w-full flex justify-between items-center text-left px-4 py-3 bg-white font-semibold"
              onClick={() => toggleAccordion(accord.key)}
            >
              {accord.title}
              <i
                className={`fa ${accord.isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
              ></i>
            </button>
            {accord.isOpen && (
              <div className="p-4 bg-white border-t border-dashed">{accord.data}</div>
            )}
          </div>
        ))}
      </div>
  );
}

export default Accordion;
