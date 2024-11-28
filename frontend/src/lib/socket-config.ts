import { io, Socket } from "socket.io-client"
import Env from "./env"

let socket: Socket 

export const getSocket = () => {
  if (!socket) {
    socket = io(Env.BACKEND_URL, { autoConnect: false });
  }
  
  return socket;
};

// export function getSocket(options?: { auth?: { room: string } }): Socket {
//     if (!socket) {
//       socket = io(Env.BACKEND_URL, { 
//         autoConnect: false,
//         auth: options?.auth || {} 
//       });
//     }
//     return socket;
//   }