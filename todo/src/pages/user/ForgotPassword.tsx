import { FC, memo } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import userApi from '../../api/userApi'
import Spinner from '../../components/Spinner';

interface props { }

const ForgotPassword: FC<props> = ({ }) => {
  const { register, handleSubmit } = useForm();
  const { loading, forgotPassword } = useUser()

  const onSubmit = async (input: any) => {
    const { email } = input
    if (!email) {
      toast.error("Invalid input")
      return
    }
    const params = { email }
    const response = await forgotPassword(userApi.forgotPassword(), params)
    if (response) {
      toast.success(response.displayMessage)
    }
  };

  return (
    <>
      {!loading && <>
        <div className="text-lg mb-3 font-bold">Forgot Password</div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <AiOutlineUser />
            <input type="email" {...register('email')} className="grow" placeholder="Email" />
          </label>
          <div className="mx-auto mb-3 text-xs">
            <Link className="me-2 cursor-pointer hover:text-sky-300" to="/signIn">Go back to signIn</Link>
          </div>
          <button className="btn btn-info btn-wide">Forgot Password</button>
        </form>
      </>}
      {loading && <Spinner />}
    </>
  )
}

export default memo(ForgotPassword)