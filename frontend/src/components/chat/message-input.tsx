import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4"
    >
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Send className="h-5 w-5 mr-2" />
          Send
        </Button>
      </div>
    </form>
  );
}
