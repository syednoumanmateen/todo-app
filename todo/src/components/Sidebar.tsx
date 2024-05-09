import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { MdSpaceDashboard } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { FaBlog, FaMoneyBillTransfer, FaRegImages } from "react-icons/fa6";
import { BsFillChatFill } from "react-icons/bs";
import { HiMenuAlt2 } from 'react-icons/hi';
import { AiFillProfile } from 'react-icons/ai';
import { BiSolidVideos } from 'react-icons/bi';

const menu = [{
  to: "/",
  name: "Dashboard",
  icon: <MdSpaceDashboard className="text-xl" />
}, {
  to: "/todo/list",
  name: "Todo",
  icon: <RiTodoLine className="text-xl" />,
  sub: [{
    to: "/todo/list",
    name: "List"
  }, {
    to: "/todo/view",
    name: "View"
  }, {
    to: "/todo/add",
    name: "Add"
  }]
}, {
  to: "/blog/list",
  name: "Blog",
  icon: <FaBlog className="text-xl" />,
  sub: [{
    to: "/blog/list",
    name: "List"
  }, {
    to: "/blog/view",
    name: "View"
  }, {
    to: "/blog/add",
    name: "Add"
  }]
}, {
  to: "/expense/list",
  name: "Expense",
  icon: <FaMoneyBillTransfer className="text-xl" />,
  sub: [{
    to: "/expense/dashboard",
    name: "Home"
  }, {
    to: "/expense/list",
    name: "List"
  }, {
    to: "/expense/expenseAdd",
    name: "Expense Add"
  }, {
    to: "/expense/incomeAdd",
    name: "Income Add"
  }]
}, {
  to: "/chat",
  name: "Chat",
  icon: <BsFillChatFill className="text-xl" />
}, {
  to: "/profile",
  name: "Profile",
  icon: <AiFillProfile className="text-xl" />
}, {
  to: "/imageGallery",
  name: "Images",
  icon: <FaRegImages className="text-xl" />
}, {
  to: "/videoGallery",
  name: "Videos",
  icon: < BiSolidVideos className="text-xl" />
}]

interface props {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void
}

const Sidebar: FC<props> = ({ showSideBar, setShowSideBar }) => {
  const closeMenu = () => setShowSideBar(!showSideBar);

  return (
    <>
      <div className={`offcanvas bg-dark text-light ${showSideBar ? ' show' : ''}`}>
        <div className="offcanvas-content">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">To Do</h5>
            <button type="button" className="btn-close text-reset" onClick={closeMenu}>
              <HiMenuAlt2 className="text-white text-xl" />
            </button>
          </div>
          <div className="offcanvas-body">
            <ul className="menu rounded-box">
              {menu.map((m, mInd) => (
                <li key={mInd}>
                  {!m.sub && <NavLink to={m.to} onClick={closeMenu}><span className="me-2">{m.icon}</span>{m.name}</NavLink>}
                  {m.sub && <details open>
                    <summary><span className="me-2">{m.icon}</span>{m.name}</summary>
                    <ul>
                      {m && m.sub.map((sub, subind) => (
                        <li key={subind}>
                          <NavLink to={sub.to} onClick={closeMenu}>{sub.name}</NavLink>
                        </li>))}
                    </ul>
                  </details>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={`offcanvas-backdrop ${showSideBar ? ' show' : ''}`} onClick={closeMenu}></div>
    </>
  )
}

export default memo(Sidebar)