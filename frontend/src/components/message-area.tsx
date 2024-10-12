import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

interface MessagesAreaProps {
  messages: Message[];
}

export default function MessagesArea({ messages }: MessagesAreaProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-4 ${
            message.isMe ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
              message.isMe
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            <p>{message.content}</p>
            <span
              className={`text-xs mt-1 block text-right ${
                message.isMe
                  ? "text-blue-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {message.time}
            </span>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
