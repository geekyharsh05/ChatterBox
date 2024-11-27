"use client"

import { getSocket } from '@/lib/socket-config'
import { useEffect, useMemo } from 'react'
import { v4 as uuidV4 } from "uuid"
import { Button } from '../ui/button'

const ChatBase = () => {
    const socket = useMemo(() => {
        const socket = getSocket();
        const connection = socket.connect();
        if (!connection) {
            console.error("Socket connection failed");
        }
        return connection;
    }, []);

    useEffect(() => {
        const handleMessage = (data: { name: string; id: string }) => {
            console.log("The socket msg is", data);
        };

        if (socket) {
            socket.on("message", handleMessage);
        }

        return () => {
            if (socket) {
                socket.off("message", handleMessage);
                socket.close();
            }
        };
    }, [socket]);

    const handleClick = () => {
        if (socket) {
            socket.emit("message", { name: "Harsh", id: uuidV4() });
        } else {
            console.error("Socket is not connected");
        }
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Send Message
            </Button>
        </div>
    )
}

export default ChatBase