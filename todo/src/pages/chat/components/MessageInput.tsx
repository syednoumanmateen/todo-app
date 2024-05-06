import { FC, memo } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../../hooks/useSendMessage"

interface props { }

const MessageInput: FC<props> = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { loading, sendMessage } = useSendMessage();

  const onSubmit = async (input: any) => {
    const { message } = input
    if (!message) {
      toast.error("Invalid message")
      return
    }
    sendMessage(message);
    setValue("message", "");
  };


  return (
    <>
      <form className='px-4 my-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full relative'>
          <input type='text' {...register('message')} className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white' placeholder='Send a message' />
          <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>{loading ? "loading..." : <BsSend />}</button>
        </div>
      </form>
    </>
  )
}

export default memo(MessageInput)