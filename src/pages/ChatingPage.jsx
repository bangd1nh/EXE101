import React, { useState } from "react";
import SidebarComponent from "../components/chat/SideBarComponent";
import ChatWindowComponent from "../components/chat/ChatWindowComponent";
import MessageInputComponent from "../components/chat/MessageInputComponent";

function ChatingPage() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [chatHistory, setChatHistory] = useState({
        1: [
            {
                text: "Hello, do you offer wedding photography services?",
                isSender: false,
            },
            {
                text: "Hello Bnag! Yes, we do offer wedding photography services.",
                isSender: true,
            },
            {
                text: "I would like to schedule a shoot for this weekend, is that possible?",
                isSender: false,
            },
            {
                text: "Yes, that's possible. We will arrange a photographer for you.",
                isSender: true,
            },
        ],
        2: [
            {
                text: "Hi! I want to hire event photography services.",
                isSender: false,
            },
            {
                text: "Sure, we have various packages available!",
                isSender: true,
            },
        ],
    });

    const contacts = [
        { id: 1, name: "BangDinh", status: "Weding" },
        { id: 2, name: "BangDinh", status: "Weding" },
        { id: 3, name: "BangDinh", status: "Weding" },
        { id: 4, name: "BangDinh", status: "Weding" },
        { id: 5, name: "BangDinh", status: "Weding" },
        { id: 6, name: "BangDinh", status: "Weding" },
    ];

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
    };

    const handleSendMessage = (text) => {
        if (!selectedContact) return;

        const updatedMessages = [
            ...chatHistory[selectedContact.id],
            { text, isSender: true },
        ];

        setChatHistory({
            ...chatHistory,
            [selectedContact.id]: updatedMessages,
        });
    };

    return (
        <div className="flex h-screen bg-stone-300 p-20 gap-2">
            <SidebarComponent
                contacts={contacts}
                onSelectContact={handleSelectContact}
            />
            <div className="w-3/4 flex flex-col">
                {selectedContact ? (
                    <>
                        <ChatWindowComponent
                            messages={chatHistory[selectedContact.id] || []}
                        />
                        <MessageInputComponent onSend={handleSendMessage} />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 w-full bg-white border rounded-3xl border-white">
                        Chọn một cuộc trò chuyện để bắt đầu
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatingPage;
