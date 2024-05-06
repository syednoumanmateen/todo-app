import { FC, memo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { HiOutlineKey } from "react-icons/hi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import useUser from '../../hooks/useUser';
import userApi from '../../api/userApi'
import toast from 'react-hot-toast';

interface props { }

const ResetPassword: FC<props> = ({ }) => {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { loading, resetPassword } = useUser()
  const urlParams = useParams()
  const navigate = useNavigate()

  const onSubmit = async (input: any) => {
    const { password, confirmPassword } = input
    if (!password || !confirmPassword) {
      toast.error("Invalid input")
      return
    }
    if (password !== confirmPassword) {
      toast.error("Password doesn't match with Confirm password")
      return
    }
    const params = { password, token: urlParams.token }
    const response = await resetPassword(userApi.resetPassword(), params)
    if (response) {
      toast.success(response.displayMessage)
      navigate("/signIn")
    }
  };

  return (
    <>
      {!loading && <>
        <div className="text-lg mb-3 font-bold">Reset Password</div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <HiOutlineKey />
            <input type={show ? 'text' : 'password'} {...register('password')} className="grow" placeholder="Password" />
            <span onClick={() => setShow(!show)}>{show ? <BsEyeSlash /> : <BsEye />}</span>
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <HiOutlineKey />
            <input type={showConfirm ? 'text' : 'password'} {...register('confirmPassword')} className="grow" placeholder="confirmPassword" />
            <span onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <BsEyeSlash /> : <BsEye />}</span>
          </label>
          <div className="mx-auto mb-3 text-xs">
            <Link className="me-2 cursor-pointer hover:text-sky-300" to="/signIn">Go back to signIn</Link>
          </div>
          <button className="btn btn-info btn-wide">Reset Password</button>
        </form>
      </>}
      {loading && <Spinner />}
    </>
  )
}

export default memo(ResetPassword)