import React from "react";
import { useSelector } from "react-redux";

const AccountTab = () => {
  const { team_name } = useSelector((state) => state.user);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold">Account</h2>
      <p className="text-gray-600 mb-6">Manage your profile and preferences here.</p>
      
      <div className="mb-6">
        <h3 className="flex items-center text-lg font-medium">
        Account info
        </h3>
        <p className="text-gray-500 text-sm mb-2">Tell us a bit about your company</p>
        <label className="block text-md font-medium text-gray-700">Company Name</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-3" value={team_name} readOnly/>
        <label className="block text-md font-medium text-gray-700">Contact email</label>
        <p className="text-gray-500 text-sm mb-2">Used to contact you regarding your account</p>
        <input type="email" className="w-full p-2 border border-gray-300 rounded-md" />
      </div>

      <button className="bg-[#6241D3] text-white px-4 rounded-md py-2">Save</button>
    </div>
  );
};

export default AccountTab;
