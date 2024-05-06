import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../../context/SocketContext'

interface props {
  conversation: any
}

const Conversation: FC<props> = ({ conversation }) => {
  const navigate = useNavigate()
  const socket = useSocket();
  const isOnline = socket?.onlineUsers.includes(conversation._id);


  return (
    <>
      <div className="flex gap-2 items-center p-2 hover:bg-sky-500 rounded cursor-pointer" onClick={() => navigate(`/chat/${conversation._id}`)}>
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 h-12 rounded-full">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&s" alt="User avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.name}</p>
            <span className="text-text-lg">
              O
            </span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  )
}

export default memo(Conversation)