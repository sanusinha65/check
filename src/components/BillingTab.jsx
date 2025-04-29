import React from "react";

const BillingTab = () => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold">Account</h2>
      <p className="text-gray-600 mb-6">Manage your profile and preferences here.</p>
      
      <div className="mb-6 border-b border-gray-300 pb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <i className="fas fa-credit-card"></i> Payment card
        </h2>
        <p className="text-sm text-gray-500">Add or change your billing method</p>
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Card number"
          />
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="w-1/2 p-2 border border-gray-300 rounded"
              placeholder="e.g: 90500"
            />
            <input
              type="text"
              className="w-1/2 p-2 border border-gray-300 rounded"
              placeholder="e.g: John Smith"
            />
          </div>
          <button className="mt-4 bg-[#6241D3] text-white py-2 px-4 rounded-md">
            Change card
          </button>
        </div>
      </div>

      {/* Current Subscription Section */}
      <div className="mb-6 border-b border-gray-300 pb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <i className="fas fa-shopping-cart"></i> Current subscription
        </h2>
        <p className="text-sm text-gray-500">View and edit your subscription</p>
        <div className="mt-4 grid lg:grid-cols-3 md:grid-cols-3 gap-x-2 sm:grid-cols-1">
          <div className="p-4 lg:py-6 border border-gray-300 rounded text-left flex flex-col justify-between gap-y-2">
            <p className="text-gray-500 text-sm">PLAN</p>
            <p className="font-semibold text-xl">Free</p>
            <button className="text-gray-600 border border-gray-300 w-full rounded-md py-2 text-sm shadow-md">Change</button>
          </div>
          <div className="p-4 lg:py-6 border border-gray-300 rounded text-left flex flex-col justify-between gap-y-2">
            <p className="text-gray-500 text-sm">SEATS</p>
            <p className="font-semibold text-xl">1 / 1</p>
            <button className="text-gray-600 border border-gray-300 w-full rounded-md py-2 text-sm shadow-md">Edit</button>
          </div>
          <div className="p-4 lg:py-6 border  border-gray-300 rounded text-left flex flex-col justify-between gap-y-2">
            <p className="text-gray-500 text-sm">NEXT RENEWAL</p>
            <p className="font-semibold text-xl">Apr 1, 2025</p>
            <p className="text-gray-500 text-xs">You will receive a refill.</p>
          </div>
        </div>
      </div>

      {/* Billing History Section */}
      <div>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <i className="fas fa-file-invoice"></i> Billing history
        </h2>
        <p className="text-sm text-gray-500">View and download your past invoices</p>
        <table className="w-full text-gray-600 mt-4 bg-gray-100 text-left">
          <thead className="">
            <th className="px-2 py-3">Description</th>
            <th className="px-2 py-3">Amount</th>
            <th className="px-2 py-3">Status</th>
            <th className="px-2 py-3">Date</th>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default BillingTab;
