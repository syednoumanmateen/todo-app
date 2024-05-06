import { FC, memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useUser from '../../hooks/useUser';
import userApi from '../../api/userApi'
import Spinner from '../../components/Spinner';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface props { }

const SignIn: FC<props> = ({ }) => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate()
  const auth = useAuth()

  const { loading, signIn } = useUser()
  const [show, setShow] = useState(false)

  const localSignInData = localStorage.getItem("signIn")
  const signInData: any = localSignInData ? JSON.parse(localSignInData) : {}
  useEffect(() => {
    setValue('email', signInData?.email ?? '')
    setValue('password', signInData?.password ?? '')
    setValue('rememberme', signInData?.rememberme ?? false)
  }, [])

  const onSubmit = async (input: any) => {
    const { email, password, rememberme } = input
    if (!email || !password) {
      toast.error("Invalid input")
      return
    }
    if (rememberme) {
      localStorage.setItem("signIn", JSON.stringify(input))
    }
    const params = { email, password }
    const response = await signIn(userApi.signIn(), params)
    if (response) {
      auth?.signIn(response.result.data)
      toast.success(response.displayMessage)
      navigate("/")
    }
  };

  return (
    <>
      {!loading && <>
        <div className="text-lg mb-3 font-bold">Sign In</div>
        <form className="item-center" onSubmit={handleSubmit(onSubmit)}>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <AiOutlineMail />
            <input type="email" {...register('email')} className="grow" placeholder="Email" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-3">
            <HiOutlineKey />
            <input type={show ? 'text' : 'password'} {...register('password')} className="grow" placeholder="Password" />
            <span onClick={() => setShow(!show)}>{show ? <BsEyeSlash /> : <BsEye />}</span>
          </label>
          <div className="mb-3 flex items-center">
            <input type="checkbox" {...register('rememberme')} className="me-2 checkbox" />remember me
          </div>
          <div className=" mx-auto mb-3 text-xs">
            <Link className="me-2 cursor-pointer hover:text-sky-300" to="/signUp">User not exists please signUp</Link>|
            <Link className="ms-2 cursor-pointer hover:text-sky-300" to="/forgotPassword">forgot password</Link>
          </div>
          <button className="btn btn-info text-white btn-wide">Sign In</button>
        </form>
      </>}
      {loading && <Spinner />}
    </>
  )
}

export default memo(SignIn)