import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLists } from "../api/supabase";
import { useSelector } from "react-redux";

const TableComponent = ({ searchTerm, selectedLists, setSelectedLists, refreshKey }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { team_id } = useSelector(state => state.user);
  
  useEffect(() => {
    const loadLists = async () => {

      if (!team_id) return;

      try {
        setLoading(true);
        if (team_id) {
          const data = await fetchLists(team_id);
          setLists(data);
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadLists();
  }, [team_id, refreshKey]);  

  const filteredData = lists
    .map((item) => ({
      id: item.id,
      name: item.name,
      total: item.total_profiles,
    }))
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLists([]);
    } else {
      setSelectedLists(lists.map((list) => list.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectList = (id) => {
    if (selectedLists.includes(id)) {
      const newSelected = selectedLists.filter((listId) => listId !== id);
      setSelectedLists(newSelected);
      setSelectAll(false);
    } else {
      const newSelected = [...selectedLists, id];
      setSelectedLists(newSelected);
      if (newSelected.length === lists.length) {
        setSelectAll(true);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-[#eeecf4] shadow-md rounded-md table-fixed">
  <thead className="bg-[#f4f2fa] text-[#6241D3]">
    <tr>
      <th className="py-2 px-4 w-12 text-center">
        <input
          type="checkbox"
          className="h-4 w-4 accent-[#6241D3]"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      </th>
      <th className="py-2 px-4 text-left uppercase text-sm w-1/2">List Name</th>
      <th className="py-2 px-4 text-left uppercase text-sm w-1/2">Total People</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="3" className="py-6 text-center text-gray-500">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-800"></div>
          </div>
        </td>
      </tr>
    ) : filteredData.length > 0 ? (
      filteredData.map((item) => (
        <tr
          key={item.id}
          className="hover:bg-[#f9f9fc] transition-colors duration-200 cursor-pointer border-b border-[#eeecf4]"
          onClick={() => navigate(`/lists/${item.id}`)}
        >
          <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#6241D3]"
              checked={selectedLists.includes(item.id)}
              onChange={() => handleSelectList(item.id)}
            />
          </td>
          <td className="py-3 px-4 font-semibold">{item.name}</td>
          <td className="py-3 px-4">{item.total}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" className="py-6 text-center text-gray-500">
          No results found
        </td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  );
};

export default TableComponent;
