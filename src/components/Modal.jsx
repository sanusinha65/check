import { useState } from "react";
import { createList } from "../api/supabase";
import MixpanelService from "../utils/mixpanel";
import { useSelector } from "react-redux";

export default function CreateList({ isOpen, setIsOpen, refreshLists}) {
    const [listName, setListName] = useState("");
    const [loading, setLoading] = useState(false);
    const { team_id } = useSelector(state => state.user);

    const handleCreate = async () => {
        if (!listName.trim()) return;

        setLoading(true);
        try {
            const newList = await createList(team_id, listName);
            if (newList) {
                console.log("List Created:", newList);
                setListName("");
                setIsOpen(false);
                refreshLists();
            }
        } catch (error) {
            console.error("Error creating list:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-5 rounded-md shadow-xl w-80">
                <h2 className="text-lg font-medium text-gray-800">Enter List Name</h2>
                <input
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="List name"
                    className="mt-3 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => {setIsOpen(false); setListName("");  MixpanelService.trackModalInteraction("create_list", "closed");}}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={!listName.trim() || loading}
                        className="px-4 py-2 text-white bg-[#6241D3] rounded-lg hover:bg-purple-300 disabled:bg-purple-200 transition">
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
