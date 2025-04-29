

export default function FetchAllEmails({ isOpen, setIsOpen }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-5 rounded-md shadow-xl w-80">
                <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800 text-center">Find Emails</h2>
                <button onClick={setIsOpen(!isOpen)}>X</button>
                </div>
                <p className="text-left text-gray-500">Find the emails of the leads:</p>
                <p className="text-left text-gray-700">test123</p>
                <div className="flex justify-between gap-x-3 mt-5">
                    <div className="px-6 py-2 text-white text-center bg-gray-800 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 transition">
                    <button>
                        All Leads
                    </button>
                    <p className="text-gray-400">36 credits</p>
                    </div>
                    <div className="px-4 py-2 text-white text-center bg-gray-800 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 transition">
                    <button>Selected Leads
                    </button>
                    <p className="text-gray-400">34 credits</p>
                    </div>
                </div>
                <p className="text-left text-gray-500 mt-2">Credits will be refunded for unfound emails</p>
            </div>
        </div>
    );
}