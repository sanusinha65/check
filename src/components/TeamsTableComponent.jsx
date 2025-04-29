import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchTeamMembers } from "../api/supabase.js";
import { useSelector } from "react-redux";

const TeamsTableComponent = ({ searchTerm, refreshTrigger }) => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();
  const { team_id } = useSelector(state => state.user);
  

  useEffect(() => {
    const loadTeamMembers = async () => {
      if (!team_id) return;

      try {
        const members = await fetchTeamMembers(team_id);
        setTeamMembers(members);
      } catch (error) {
        console.error("Error loading team members:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, [team_id, refreshTrigger]);

  const filteredData = teamMembers.filter((member) =>
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-[#eeecf4] shadow-md rounded-md">
        <thead className="bg-[#f4f2fa] text-[#6241D3]">
          <tr>
            <th className="p-3 text-left uppercase text-sm">Name</th>
            <th className="p-3 text-left uppercase text-sm">Email</th>
            <th className="p-3 text-left uppercase text-sm">Role</th>
            <th className="p-3 text-left uppercase text-sm">Plugin Installed</th>
            <th className="p-3 text-left uppercase text-sm">Linkedin Premium</th>
            <th className="p-3 text-left uppercase text-sm">Status</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
              <div className="flex justify-center items-center col-span-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-800"></div>
              </div>
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((member, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-[#fffcfc] cursor-pointer"
              >
                <td className="p-3 font-semibold">{member.name}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.role == "user" ? "User" : "Admin"}</td>
                <td className="p-3">{member.users?.plugin_installed_at ? "Yes" : "No" }</td>
                <td className="p-3">{member.users?.linkedin_premium_at ? "Yes" : "No" }</td>
                <td className="p-3"><span className={`border p-2 rounded-md text-sm font-medium ${
                  member.status == "accepted" ? "text-green-600 bg-green-100 border-green-400" : "text-red-600 bg-red-100 border-red-400"
                }`}>{member.status}</span></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsTableComponent;
