import { FC, memo } from 'react'
import { BiArrowBack } from "react-icons/bi";
import Messages from './components/Messages';
import MessageInput from './components/MessageInput';
import useConversation from '../../zustand/useConversation';

interface props { }

const MessageContainer: FC<props> = () => {
  const { selectedConversation } = useConversation();

  return (
    <>
      <div className='w-full flex flex-col'>
        <div className="flex items-center text-xl py-2 border-b border-slate-700">
          <BiArrowBack className="text-white mx-2" />
          <div className="avatar">
            <div className="w-9 h-9 rounded-full">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtYqXjw6IR_opev4UADLjT8TPcLmWYQsx_YQ&s" alt="User avatar" />
            </div>
          </div>
          <div className="px-2">
            <span className="text-white font-bold">{selectedConversation?.name}</span>
          </div>
        </div>
        <Messages />
        <MessageInput />
      </div>
    </>
  )
}

export default memo(MessageContainer)