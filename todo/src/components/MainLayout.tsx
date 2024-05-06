import { FC, memo, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

interface props { }

const MainLayout: FC<props> = () => {
  const [showSideBar, setShowSideBar] = useState(false)
  return (
    <>
      <div className="row g-0 text-light">
        <div className="col-12">
          <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        </div>
        <div className="col-12">
          {showSideBar && <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />}
          <div className="container-lg p-2 bg-dark text-light">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(MainLayout)