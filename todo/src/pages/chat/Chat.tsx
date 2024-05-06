import { FC, memo } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

interface props { }

const Chat: FC<props> = () => {
  return (
    <>
      <div className="flex flex-grow">
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default memo(Chat)