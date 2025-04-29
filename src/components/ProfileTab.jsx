import React from "react";
import { useSelector } from "react-redux";

const ProfileTab = () => {
  const { email, name } = useSelector((state) => state.user);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Profile</h2>
      <p className="text-gray-600 mb-6">Manage your profile and preferences here.</p>

      <div className="mb-6">
        <h3 className="flex items-center text-lg font-medium">Account details</h3>
        <p className="text-gray-500 text-sm mb-2">This is how you access your account</p>

        <label className="block text-md font-medium text-gray-700">Email address</label>
        <p className="text-gray-500 text-sm mb-2">You will use it to login</p>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
          value={email}
          readOnly
        />

        {/* <label className="block text-md font-medium text-gray-700">Password</label>
        <p className="text-gray-500 text-sm mb-2">Minimum of 6 characters</p>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded-md"
          readOnly
        /> */}
      </div>

      <div className="mb-6">
        <h3 className="flex items-center text-lg font-medium">Basic info</h3>
        <p className="text-gray-500 text-sm mb-2">Update your personal information here</p>

        <label className="block text-md font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
          value={name}
          readOnly
        />

        <label className="block text-md font-medium text-gray-700">Phone number</label>
        <p className="text-gray-500 text-sm mb-2">Used for communication regarding your account</p>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md"
          readOnly
        />
      </div>

      <button className="bg-[#6241D3] text-white px-4 rounded-md py-2">Save</button>
    </div>
  );
};

export default ProfileTab;
