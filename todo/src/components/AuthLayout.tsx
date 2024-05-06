import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'


interface props { }

const AuthLayout: FC<props> = () => {
  return (
    <>
      <div className="md:p-auto sm:p-5 flex flex-col justify-center items-center text-light h-screen text-center ">
        <div className="card lg:w-2/6 md:w-2/4 sm:w-full bg-black">
          <div className="card-body">
            <Outlet />
          </div>
        </div>

      </div>
    </>
  )
}

export default memo(AuthLayout)