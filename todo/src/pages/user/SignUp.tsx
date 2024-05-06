import { FC, memo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import toast from 'react-hot-toast';
import useUser from '../../hooks/useUser';
import userApi from '../../api/userApi'
import Spinner from '../../components/Spinner';

interface props { }

const SignUp: FC<props> = ({ }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const { loading, signUp } = useUser()
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const onSubmit = async (input: any) => {
    const { email, name, gender, password, confirmPassword } = input
    if (!email || !name || !gender || !password || !confirmPassword) {
      toast.error("Invalid input")
      return
    }
    if (password !== confirmPassword) {
      toast.error("Password doesn't match with Confirm password")
      return
    }
    const params = { email, name, gender, password }
    const response = await signUp(userApi.signUp(), params)
    if (response) {
      toast.success(response.displayMessage)
      navigate("/signIn")
    }
  };

  return (
    <>
      {!loading && <>
        <div className="text-lg mb-3 font-bold">Sign Up</div>
        <form className="item-center" onSubmit={handleSubmit(onSubmit)}>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <AiOutlineMail />
            <input type="email" {...register('email')} className="grow" placeholder="Email" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <AiOutlineUser />
            <input type="text" className="grow" {...register('name')} placeholder="Name" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <CgGenderMale /> <span className="mx-2">Male</span>
              <input {...register("gender")} type="radio" value="male" />
            </div>
            <div className="flex items-center">
              <CgGenderFemale /> <span className="mx-2">Female</span>
              <input {...register("gender")} type="radio" value="female" />
            </div>
          </label>
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
            <Link className="me-2 cursor-pointer hover:text-sky-300" to="/signIn">User already exists please signIn</Link>
          </div>
          <button className="btn btn-info text-white btn-wide">Sign Up</button>
        </form>
      </>}
      {loading && <Spinner />}
    </>
  )
}

export default memo(SignUp)