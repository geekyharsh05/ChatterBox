"use client"
import { useState } from "react";
import Sidebar from "./sidebar";
import ChatHeader from "./chat-header";
import MessagesArea from "./message-area";
import MessageInput from "./message-input";

const conversationsData = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    unread: 2,
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Can we meet tomorrow?",
    time: "9:45 AM",
    unread: 0,
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: 3,
    name: "Michael Brown",
    lastMessage: "I'll send the document later.",
    time: "Yesterday",
    unread: 1,
    avatar: "https://i.pravatar.cc/300?img=3",
  },
];

const messagesData = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hey, how are you?",
    time: "10:30 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "I'm good, how about you?",
    time: "10:32 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "John Doe",
    content: "I'm doing well, thanks!",
    time: "10:33 AM",
    isMe: false,
  },
];

export default function ChatApp() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversationsData[0]
  );
  const [messages, setMessages] = useState(messagesData);

  const handleSendMessage = (newMessage: string) => {
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "Me",
        content: newMessage,
        time: "Now",
        isMe: true,
      },
    ]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        conversations={conversationsData}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
      />
      <div className="flex-1 flex flex-col">
        <ChatHeader conversation={selectedConversation} />
        <MessagesArea messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
