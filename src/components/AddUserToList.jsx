import { useState, useEffect } from "react";
import MixpanelService from "../utils/mixpanel";
import { addUserToList, fetchLists } from "../api/supabase";
import { useSelector } from "react-redux";

export default function AddUserToList({ setIsOpen, full_name, slug, setListInfo }) {
    const [loading, setLoading] = useState(false);
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null); // now object
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState("");
    const { team_id } = useSelector(state => state.user);

    useEffect(() => {
        fetchLists(team_id)
            .then((data) => {
                setLists(data);
                if (data.length > 0) {
                    setSelectedList(data[0]); // store full object
                }
            })
            .catch((error) => {
                console.error("Failed to fetch lists", error);
                setError("Failed to load lists. Please try again.");
            })
            .finally(() => setIsFetching(false));
    }, [team_id]);

    const handleCreate = async () => {
        if (!selectedList) return;
        setLoading(true);
        setError("");
        try {
            const result = await addUserToList(team_id, selectedList.id, full_name, slug);
            if (result.error) {
                console.error("Error adding user to list:", result.error);
                setError(result.error);
            } else {
                console.log("Inserted LinkedIn profile:", result);
                setIsOpen(false);
                setListInfo(prev => [
                    ...prev,
                    {
                        list_id: selectedList.id,
                        name: selectedList.name,
                        linkedin_profile_id: result.linkedin_profile_id,
                    }
                ]);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        const listObj = lists.find(list => list.id === selectedId);
        setSelectedList(listObj || null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-90 rounded-md bg-white p-5 shadow-xl transition-all">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Add User to List</h2>

                <div className="flex flex-col gap-2 mb-2">
                    <label className="text-sm font-medium text-gray-700">Select List</label>
                    <select
                        value={selectedList?.id || ""}
                        onChange={handleSelectChange}
                        disabled={isFetching}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6241D3] focus:ring-2 focus:ring-[#6241D3] focus:outline-none"
                    >
                        {isFetching ? (
                            <option>Fetching all lists...</option>
                        ) : lists.length > 0 ? (
                            lists.map((list) => (
                                <option key={list.id} value={list.id}>
                                    {list.name}
                                </option>
                            ))
                        ) : (
                            <option>No lists available</option>
                        )}
                    </select>
                </div>

                {error && (
                    <div className="mb-4 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            MixpanelService.trackModalInteraction("add_user_to_list", "closed");
                        }}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={loading || isFetching || !selectedList}
                        className={`px-4 py-2 text-white rounded-lg transition 
                            ${loading || isFetching || !selectedList
                                ? "bg-purple-200 cursor-not-allowed"
                                : "bg-[#6241D3] hover:bg-purple-300"}`}
                    >
                        {loading ? "Adding..." : "Add User"}
                    </button>
                </div>
            </div>
        </div>
    );
}
