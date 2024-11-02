"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

interface SidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export default function Sidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
}: SidebarProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-1/4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
            Chats
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            <motion.div
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.div>
          </Button>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search conversations"
            className="pl-10"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-120px)]">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversation?.id === conversation.id}
            onSelect={() => onSelectConversation(conversation)}
          />
        ))}
      </ScrollArea>
    </div>
  );
}

function ConversationItem({
  conversation,
  isSelected,
  onSelect,
}: {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`flex items-center p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 ${
        isSelected ? "bg-blue-100 dark:bg-blue-800" : ""
      }`}
      onClick={onSelect}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={conversation.avatar} alt={conversation.name} />
        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300">
            {conversation.name}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {conversation.time}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          {conversation.lastMessage}
        </p>
      </div>
      {conversation.unread > 0 && (
        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {conversation.unread}
        </span>
      )}
    </div>
  );
}
