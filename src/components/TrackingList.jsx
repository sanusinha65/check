import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteTrackingList, editTrackingList, fetchTrackingLists } from "../api/supabase";
import AddKeywordModal from "./AddKeywordModal";
import EditKeywordModal from "./EditKeywordModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileEdit, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import MixpanelService from "../utils/mixpanel";
import { formatDistanceToNowStrict } from "date-fns";
import { useSelector } from "react-redux";

const useResponsiveItemsPerPage = (rowHeight = 60, headerHeight = 200) => {
    const [itemsPerPage, setItemsPerPage] = useState(10); // default fallback
  
    useEffect(() => {
      const calculateItems = () => {
        const screenHeight = window.innerHeight;
        const availableHeight = screenHeight - headerHeight;
        const count = Math.floor(availableHeight / rowHeight);
        setItemsPerPage(count > 0 ? count : 1);
      };
  
      calculateItems();
      window.addEventListener("resize", calculateItems);
      return () => window.removeEventListener("resize", calculateItems);
    }, [rowHeight, headerHeight]);
  
    return itemsPerPage;
};

const KeywordTracking = () => {
    const { team_id } = useSelector(state => state.user);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editKeywordId, setEditKeywordId] = useState(null);
    const [editKeywordName, setEditKeywordName] = useState(null);
    const [editKeywordPublic, setEditKeywordPublic] = useState(null);
    const [fetchFreq, setFetchFreq] = useState("")
    const [notification, setNotification] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditKeywordModalOpen, setIsEditKeywordModalOpen] = useState(false)
    const navigate = useNavigate();
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { keywordList, listName } = location.state || {};
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = useResponsiveItemsPerPage(60, 180); 
    const [selectAll, setSelectAll] = useState(false);
    const [selectedLists, setSelectedLists] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');

    // Filter keywords based on search term
    const filteredKeywords = keywords.filter(keyword => 
      keyword.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedKeywords = filteredKeywords.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredKeywords.length / itemsPerPage);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('addKeyword') === 'true') {
            setIsAddModalOpen(true); 
        }
    }, [location]);
    
    const loadKeywords = async () => {
        if (!team_id) return;

        setLoading(true);
        try {
            const response = await fetchTrackingLists(team_id);
            if (response) {
                setKeywords(response);
            } 
        } catch (error) {
            console.error("Failed to fetch tracking lists:", error);
            alert("Failed to load tracking lists. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        loadKeywords();
    }, [team_id]);
    
    const handleSave = async (id) => {
        setLoading(true);
        try {
            const response = await editTrackingList(editKeywordName, editKeywordId, editKeywordPublic, fetchFreq, notification);
            if (response.data) {
                setKeywords((prev) => prev.filter((keyword) => keyword.id !== id));
                loadKeywords();
            }
        } catch (error) {
            console.error("Failed to save tracking list:", error);
            alert("Failed to save the tracking list. Please try again.");
        } finally {
            setLoading(false);
            setIsEditModalOpen(false);
            setEditKeywordId(null);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
          setSelectedLists([]);
        } else {
          setSelectedLists(filteredKeywords.map((list) => list.id));
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
          if (newSelected.length === filteredKeywords.length) {
            setSelectAll(true);
          }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedLists.length === 0) return;
        setLoading(true);
    
        try {
            const idsToDelete = Array.isArray(selectedLists) ? selectedLists : [selectedLists];
            const response = await deleteTrackingList(idsToDelete);
            
            if (response.data) {
                setKeywords(prev => prev.filter(keyword => !idsToDelete.includes(keyword.id)));
                setSelectedLists([]);
                setSelectAll(false);
            }
        } catch (error) {
            console.error("Error deleting selected lists:", error);
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false);
            loadKeywords();
        }
    };

    return (
        <div className="w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center md:justify-between my-6">
                <div>
                    <h2 className="text-lg md:text-xl font-semibold">Keyword Tracking List</h2>
                    <p className="text-gray-500 text-sm">Monitor and manage your tracked keywords effectively</p>
                </div>

                <div className="flex flex-col md:flex-row gap-2 mt-4">
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                          <i className="fa fa-search"></i>
                        </div>
                        <input
                          type="text"
                          placeholder="Search tracking list"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page when searching
                          }}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#6241D3] focus:border-[#6241D3]"
                        />
                    </div>
                    <button 
                        onClick={() => loadKeywords()}
                        className="text-[#6241D3] border border-[#6241D3] hover:bg-[#6241D3] hover:text-white px-2 py-2 rounded-md transition cursor-pointer w-full sm:w-auto"
                    >
                        <FontAwesomeIcon icon={faRefresh}/>
                    </button>
                    <button
                        className="bg-[#6241D3] text-white hover:text-[#6241D3] border border-[#6241D3] hover:bg-white px-5 py-2 rounded-md  transition cursor-pointer"
                        onClick={() => {setIsAddModalOpen(true);  MixpanelService.trackModalInteraction("add_tracking_list", "opened");}} 
                    >
                        + Add New Tracking List
                    </button>

                    <div>
                        <button
                            className={`px-4 py-2 rounded-md transition-colors duration-200
                                ${selectedLists.length > 0 
                                ? "bg-red-500 text-white cursor-pointer" 
                                : "bg-red-200 text-white cursor-not-allowed"
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDeleteModalOpen(true);
                            }}
                            disabled={selectedLists.length === 0}
                            >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                            {selectedLists.length > 0 && ` (${selectedLists.length})`}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-x-auto min-h-[calc(100vh-260px)]">
                <table className="w-full border border-[#eeecf4] rounded-md">
                    <thead className="bg-[#f4f2fa] text-[#6241D3]">
                    <tr className="w-full">
                        <th className="py-3 text-center">
                            <input
                            type="checkbox"
                            className="h-4 w-4 accent-[#6241D3]"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            />
                        </th>
                        <th className="p-2 text-left uppercase text-sm whitespace-nowrap w-[30%]">
                            Tracking List
                        </th>
                        <th className="p-2 text-left uppercase text-sm whitespace-nowrap w-[15%]">
                            Last Synced
                        </th>
                        <th className="p-2 text-left uppercase text-sm whitespace-nowrap w-[10%]">
                            Mentions
                        </th>
                        <th className="p-2 text-left uppercase text-sm whitespace-nowrap w-[10%]">
                            Positive
                        </th>
                        <th className="p-2 text-left uppercase text-sm whitespace-nowrap w-[10%]">
                            Negative
                        </th>
                        <th className="p-2 text-left uppercase text-sm whitespace-nowrap w-[20%]">
                            Actions
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="p-4 text-center">
                                    <div className="flex justify-center items-center col-span-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-800"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredKeywords.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-6 text-center text-gray-500">
                                    {searchTerm ? "No matching tracking lists found" : "No Tracking List Found"}
                                </td>
                            </tr>
                        ) : (
                            paginatedKeywords.map((keyword) => (
                                <tr 
                                    key={keyword.id} 
                                    className="border-b border-gray-200 hover:bg-[#fffcfc] cursor-pointer" 
                                    onClick={() => navigate(`/tracking/${keyword.name.toLowerCase().trim().replace(/\s+/g, '-')}-${keyword.id}`)}
                                >
                                    <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                        <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#6241D3]"
                                        checked={selectedLists.includes(keyword.id)}
                                        onChange={() => handleSelectList(keyword.id)}
                                        />
                                    </td>
                                    <td className="p-3 font-semibold">{keyword.name}</td>
                                    <td className="p-3">
                                        {keyword.last_synced_at ? formatDistanceToNowStrict(new Date(keyword.last_synced_at), { addSuffix: true }) : "Fetching"}
                                    </td>
                                    <td className="p-2">{keyword.mention_count}</td>
                                    <td className="p-2">{keyword.positive_count}</td>
                                    <td className="p-2">{keyword.negative_count}</td>
                                    <td className="p-2 flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditKeywordId(keyword.id);
                                                setEditKeywordName(keyword.name);
                                                setEditKeywordPublic(keyword.is_public);
                                                setFetchFreq(keyword.fetch_freq);
                                                setNotification(keyword.notifications)
                                                setIsEditModalOpen(true);
                                                MixpanelService.trackModalInteraction("edit_tracking_list", "opened")
                                            }}
                                            className="border px-3 text-[#6241D3] cursor-pointer py-1 text-sm flex items-center rounded bg-white hover:bg-[#6241D3] hover:text-white"
                                        >
                                            <FontAwesomeIcon icon={faFileEdit} className="fas fa-edit mr-1"/>
                                             Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsEditKeywordModalOpen(true);
                                                setEditKeywordId(keyword.id);
                                                MixpanelService.trackModalInteraction("edit_keywords", "opened")
                                            }}
                                            className="border px-3 cursor-pointer py-1 text-sm flex items-center rounded bg-white text-[#6241D3] hover:bg-[#6241D3] hover:text-white"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="fas fa-edit mr-1"/> Edit Keywords
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {filteredKeywords.length > 0 && (
                <div className="w-full py-4">
                    <div className="flex justify-center items-center space-x-2">
                    <button
                        className={`px-4 py-2 bg-[#6241D3] text-white border border-[#6241D3] rounded ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-[#6241D3]"
                        }`}
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

                    <button
                        className={`px-4 py-2 bg-[#6241D3] text-white border border-[#6241D3] rounded ${
                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-[#6241D3]"
                        }`}
                        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold">Confirm Deletion</h3>
                        <p className="text-gray-600">Are you sure you want to delete {selectedLists.length > 1 ? 'these keywords' : 'this keyword'}?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button 
                                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer" 
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
                                onClick={handleBulkDelete}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Keyword Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-10">
                    <AddKeywordModal 
                        isOpen={true} 
                        onClose={() => setIsAddModalOpen(false)}
                        refreshList={loadKeywords} 
                        keywordList={keywordList}
                        listName={listName}
                    />
                </div>
            )}

            {/* Edit Keyword Modal */}
            {isEditKeywordModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-10">
                    <EditKeywordModal 
                        isOpen={true} 
                        onClose={() => setIsEditKeywordModalOpen(false)}
                        refreshList={loadKeywords} 
                        trackingListId={editKeywordId}
                    />
                </div>
            )}

            {
                isEditModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                            <h2 className="text-lg font-medium text-gray-800 mb-4">Edit Tracking List</h2>
                            <div className="space-y-4">
                            <div>
                                <label htmlFor="trackingListName" className="block text-sm font-medium text-gray-700">
                                Tracking List Name
                                </label>
                                <input
                                type="text"
                                id="trackingListName"
                                placeholder="Enter tracking list name"
                                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                value={editKeywordName}
                                onChange={(e) => setEditKeywordName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="isPublic" className="block text-sm font-medium text-gray-700">
                                Is Public
                                </label>
                                <select
                                    id="isPublic"
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    value={editKeywordPublic}
                                    onChange={(e) => setEditKeywordPublic(e.target.value === "true")}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="Fetch frequency" className="block text-sm font-medium text-gray-700">
                                Fetch frequency
                                </label>
                                <select
                                    onChange={(e) => setFetchFreq(e.target.value)}
                                    value={fetchFreq}
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    <option value="1">1 hour</option>
                                    <option value="2">2 hour</option>
                                    <option value="6">6 hour</option>
                                    <option value="12">12 hour</option>
                                    <option value="24">24 hour</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="Notifications" className="block text-sm font-medium text-gray-700">
                                Notifications
                                </label>
                                <select
                                    onChange={(e) => setNotification(e.target.value)}
                                    value={notification}
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    <option value="every hour">Every hour</option>
                                    <option value="every day">Every day</option>
                                </select>
                            </div>

                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditKeywordId(null);
                                    MixpanelService.trackModalInteraction("edit_tracking_list", "closed")
                                }}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => editKeywordId && handleSave(editKeywordId)}
                                disabled={!editKeywordName.trim() || loading}
                                className={`px-4 py-2 text-white rounded-lg transition  ${
                                loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#6241D3] border border-[#6421D3] hover:bg-white hover:text-[#6241D3]"
                                }`}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default KeywordTracking;