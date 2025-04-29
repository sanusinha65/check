import { useState } from "react";
import { inviteUser } from "../api/supabase";
import MixpanelService from "../utils/mixpanel";
import { useSelector } from "react-redux";

export default function TeamsModal({ isOpen, setIsOpen, setRefreshTrigger }) {
    const [emails, setEmails] = useState("");
    const [names, setNames] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const { team_id } = useSelector(state => state.user);
  
    const handleCreate = async () => {
        if (!emails.trim() || !names.trim()) {
            setError("Name and Email are required.");
            return;
        }
    
        setLoading(true);
        setError("");
    
        try {
            await inviteUser(team_id, emails, role, names);
            setIsOpen(false);
            setNames("");
            setEmails("");
            setRole("user");
            setRefreshTrigger((prev) => prev + 1);
        } catch (err) {
            console.error("Error sending invites:", err);
            setError(err.message || "Failed to send invite. Please try again.");
        } finally {
            setLoading(false);
        }
    };    

    if (!isOpen) return null;

    const roleDescriptions = {
        user: "Can only prospect and browse own lists.",
        admin: "Has full access and can browse everyone's lists.",
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-5 rounded-md shadow-xl w-100">
                <h2 className="text-lg text-gray-800 lg:text-xl font-semibold">Invite users</h2>
                <p className="text-sm my-2">
                    We will send a confirmation email to each new member before they join your organization.
                </p>

                <div className="flex flex-col">
                    <label>Role</label>
                    <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">{roleDescriptions[role]}</p>
                </div>

                <div className="flex flex-col mt-3">
                    <label>Name</label>
                    <input
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                    />
                </div>

                <div className="flex flex-col mt-3">
                    <label>Email</label>
                    <input
                        placeholder="Enter email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                    />
                </div>

                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => {setIsOpen(false); MixpanelService.trackModalInteraction("invite_user", "closed")}}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        Go back
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={!emails.trim() || !names.trim() || loading}
                        className="px-4 py-2 text-white bg-[#6241D3] rounded-lg hover:bg-[#8379a3]"
                    >
                        {loading ? "Inviting..." : "Invite users"}
                    </button>
                </div>
            </div>
        </div>
    );
}
