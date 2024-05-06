import { FC, memo } from 'react'
import { useForm } from 'react-hook-form';
import { FaSearch } from "react-icons/fa";

interface props { }

const SearchBar: FC<props> = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('search')} placeholder='Search...' className="input input-bordered rounded-full" />
        <button type='submit' className="btn btn-info btn-circle">
          <FaSearch className="text-white" />
        </button>
      </form>
    </>
  )
}

export default memo(SearchBar)