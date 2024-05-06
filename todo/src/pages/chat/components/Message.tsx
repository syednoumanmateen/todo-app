import { FC, memo } from 'react'
import { useAuth } from '../../../context/AuthContext';

interface props {
  message: any
}

const Message: FC<props> = ({ message }) => {
  const auth = useAuth()
  const fromMe = message.senderId === auth?.user?._id ? true : false;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&s" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&s";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = fromMe ? "shake" : "";

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
          <div className='w-10 rounded-full'>
            <img alt='Tailwind CSS chat bubble component' src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{10}</div>
      </div>
    </>
  )
}

export default memo(Message)