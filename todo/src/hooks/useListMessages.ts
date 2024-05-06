import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const socketContext = useSocket();
  const { messages, setMessages } = useConversation();

  const socket = socketContext?.socket;

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage: any) => {
        setMessages([...messages, newMessage]);
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
