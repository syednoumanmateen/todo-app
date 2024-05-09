import { FC, memo, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { TbReload } from "react-icons/tb";
import userApi from '../api/userApi';
import { useAuth } from '../context/AuthContext';
import useUser from '../hooks/useUser';
import helper from '../utility/helper';
import { useTheme } from '../context/ThemeContext';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

interface props {
  showSideBar: boolean,
  setShowSideBar: (showSideBar: boolean) => void;
}

const Navbar: FC<props> = ({ showSideBar, setShowSideBar }) => {
  const { reload, signOut } = useUser()
  const auth = useAuth()
  const theme = useTheme()
  const token = useMemo(() => helper.getCookiesData().token, [document.cookie])

  const handleReload = async () => {
    const result = await reload(userApi.reload(), { token })
    if (result) {
      toast.success(result.displayMessage)
    }
  }

  const handleLogout = async () => {
    const result = await signOut(userApi.signOut())
    if (result) {
      auth?.signOut()
      toast.success(result.displayMessage)
    }
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-to p-0">
        <div className="container-fluid">
          <button className="btn btn-gray btn-circle" onClick={() => setShowSideBar(!showSideBar)}>
            {showSideBar ? <HiMenuAlt3 className="text-white text-xl" /> : <HiMenuAlt2 className="text-white text-xl" />}
          </button>
          <a className="navbar-brand" href="#">One Piece</a>
          <div className='text-light'>
            <button className="btn btn-ghost btn-circle text-xl text-light"> {theme?.theme === "dark" ? <IoMoonOutline /> : <IoSunnyOutline />}</button>
            <button className="btn btn-ghost btn-circle" onClick={() => theme?.themeToggler()}>
              <input type="checkbox" value="synthwave" className="toggle theme-controller border-info [--tglbg:theme(colors.black)] checked:bg-white checked:[--tglbg:theme(colors.info)] row-start-1 col-start-1 col-span-2" />
            </button>
            <button className="btn btn-ghost btn-circle" onClick={handleReload}>
              <TbReload className='text-xl' />
            </button>
            <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
              <LuLogOut className='text-xl' />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default memo(Navbar)