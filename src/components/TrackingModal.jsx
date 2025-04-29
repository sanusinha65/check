import React, { useState } from "react";
import SearchBar from "./KeywordSearch";
import KeywordFilter from "./AdditionalKeywordFiltering";

const Modal = ({ isOpen, onClose, title, children }) => {
    const [additionalSettings, setAdditionalSettings] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-5 rounded-md shadow-xl w-200">
                <div className="flex justify-between lg:flex-row md:flex-row flex-col items-center">
                    <h2 className="text-lg font-medium text-gray-800">{title}</h2>

                    <div className="flex gap-x-2 items-center mb-4">
                    <div className="flex justify-end items-center gap-2">
                            <span className="text-gray-700">Advanced Settings</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={additionalSettings}
                                    onChange={() => setAdditionalSettings(!additionalSettings)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                            </label>
                        </div>

                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                        <i className="fa fa-times"></i>
                    </button>

                    </div>
                </div>

                {/* {title !== "Confirm Deletion" && <SearchBar />} */}


                {additionalSettings && <KeywordFilter onClose={onClose}/>}

                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
