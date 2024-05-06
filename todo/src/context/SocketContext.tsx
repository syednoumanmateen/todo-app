import { createContext, useState, useEffect, useContext, ReactNode, FC } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import domains from "../api/domains"

interface SocketContextType {
  socket?: Socket | null;
  onlineUsers: any[];
}

interface Props {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

const useSocket = () => useContext(SocketContext);

const SocketProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const auth = useAuth();

  useEffect(() => {
    if (auth?.user) {
      const newSocket = io(domains.MS, {
        query: {
          userId: auth?.user?._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users: any[]) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>);
};

export { useSocket, SocketProvider }