import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, Video } from "lucide-react";

interface ChatHeaderProps {
  conversation: { name: string; avatar: string };
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="ml-4 text-lg font-semibold text-blue-800 dark:text-blue-300">
          {conversation.name}
        </h2>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900"
        >
          <Phone className="h-5 w-5" />
          <span className="sr-only">Start voice call</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900"
        >
          <Video className="h-5 w-5" />
          <span className="sr-only">Start video call</span>
        </Button>
      </div>
    </div>
  );
}
