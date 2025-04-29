import React, { useState } from 'react';
import TableComponent from '../components/Table';
import CreateList from '../components/Modal';
import { deleteList } from "../api/supabase";
import MixpanelService from '../utils/mixpanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Meta from "../helper/Meta"

const Lists = () => {
  const { name } = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedLists, setSelectedLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { team_id } = useSelector(state => state.user);
    
  const refreshLists = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleBulkDelete = async () => {
    if (selectedLists.length === 0) return;

    try {
      await Promise.all(selectedLists.map(id => deleteList(team_id, id)));
      setSelectedLists([]);
      refreshLists();
    } catch (error) {
      console.error("Error deleting selected lists:", error);
    }
  };

  return (
    <>
    <Meta 
      title="Your Scraped LinkedIn Lists - Outx.ai" 
      description="Access and manage your scraped LinkedIn lead lists easily on Outx.ai." 
      keywords="LinkedIn lead lists, LinkedIn scraper list, Outx.ai lead management" 
    />
    <div className="min-h-screen w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="my-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between my-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Lists</h2>
            <p className="text-gray-500 text-sm">
              Select a segment to export or filter your contact lists
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap justify-between w-full gap-4">
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              
              <div className="relative flex items-center gap-2">
                <span className="text-gray-700 font-medium">Owned by:</span>
                <div className="w-48 relative">
                  <select className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 cursor-pointer appearance-none rounded-md">
                    <option>{name} (Me)</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <i className="fa-solid fa-caret-down"></i>
                  </span>
                </div>
              </div>

              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <i className="fa fa-search"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search lists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>

              <div>
                <button
                  className={`px-4 py-2 rounded transition-colors duration-200
                    ${selectedLists.length > 0 
                      ? "bg-red-500 text-white cursor-pointer" 
                      : "bg-red-200 text-white cursor-not-allowed"
                    }`}
                  onClick={selectedLists.length > 0 ? () => setIsModalOpen(true) : undefined}
                  disabled={selectedLists.length === 0}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                  {selectedLists.length > 0 && ` (${selectedLists.length})`}
                </button>
              </div>
            </div>

            <div className="w-full sm:w-auto flex gap-x-2">
            <button 
                onClick={() => refreshLists()}
                className="text-[#6241D3] border border-[#6241D3] hover:bg-[#6241D3] hover:text-white  px-2 py-2 rounded-md transition cursor-pointer w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faRefresh}/> 
              </button>
              <button 
                onClick={() => { setIsOpen(true); MixpanelService.trackModalInteraction("create_list", "opened"); }} 
                className="bg-[#6241D3] text-white px-5 py-2 rounded-md transition hover:bg-[#ab9dd8] cursor-pointer w-full sm:w-auto"
              >
                + Create List
              </button>
            </div>
          </div>
        </div>

      </div>

      <TableComponent 
        refreshKey={refreshKey} 
        searchTerm={searchTerm} 
        selectedLists={selectedLists}
        setSelectedLists={setSelectedLists}
      />
      
      <CreateList isOpen={isOpen} setIsOpen={setIsOpen} refreshLists={refreshLists} />

      {/* Delete Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete the selected list{selectedLists.length > 1 ? 's' : ''}?
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
                onClick={async () => {
                  setLoading(true);
                  await handleBulkDelete();
                  setLoading(false);
                  setIsModalOpen(false);
                }}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Lists;
