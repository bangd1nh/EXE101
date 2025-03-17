import React from "react";

const SidebarComponent = ({ contacts, onSelectContact }) => {
    return (
        <div className="w-1/4 bg-gray-200 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-blue-700">Frame Mate Chat</h2>
            <p className="text-sm text-gray-500 mb-3">
                Messaging directly to photograper
            </p>
            <input
                type="text"
                placeholder="Search"
                className="w-full p-2 rounded-md border border-gray-300 mb-3"
            />
            <div>
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className="p-2 cursor-pointer hover:bg-gray-300 rounded-md flex items-center"
                        onClick={() => onSelectContact(contact)}
                    >
                        <img src="ava.jpg" className="h-12 rounded-4xl" />
                        <div className="ms-5">
                            <p className="font-semibold">{contact.name}</p>
                            <p className="text-xs text-gray-500">
                                {contact.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarComponent;
