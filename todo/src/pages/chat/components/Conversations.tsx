import { FC, memo } from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../../hooks/useGetConversation';
import Spinner from '../../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import useConversation from '../../../zustand/useConversation';

interface props { }

const Conversations: FC<props> = () => {
  const navigate = useNavigate()
  const { loading, conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();

  const handleConversation = (conversation: any) => {
    setSelectedConversation(conversation)
    navigate(`/chat/${conversation._id}`)
  }

  return (
    <>
      <div className="hide-scrollbar overflow-auto h-full">
        {!loading && conversations?.map((conversation) => (
          <div onClick={() => handleConversation(conversation)}>
            <Conversation key={conversation._id}  conversation={conversation} />
          </div>
        ))}
        {loading && <Spinner />}
      </div>
    </>
  )
}

export default memo(Conversations)