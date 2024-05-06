import { FC, memo } from 'react'
import Message from './Message'
import useGetMessages from '../../../hooks/useGetMessage';
import useListenMessages from '../../../hooks/useListMessages';
import Spinner from '../../../components/Spinner';

interface props {
}

const Messages: FC<props> = ({ }) => {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  return (
    <>
      <div className='p-4 flex-1 hide-scrollbar overflow-auto'>
        {!loading && messages?.map((message) => (
          <div>
            <Message key={message._id} message={message} />
          </div>
        ))}
        {loading && <Spinner />}
      </div>
    </>
  )
}

export default memo(Messages)