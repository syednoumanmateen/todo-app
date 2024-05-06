import { FC, memo } from 'react'
import SearchBar from './components/SearchBar'
import Conversation from './components/Conversation'
import Conversations from './components/Conversations'

interface props { }

const Sidebar: FC<props> = () => {
  return (
    <>
      <div className="border-r border-slate-700 p-4 flex-none">
        <SearchBar />
        <div className="divider px-3"></div>
        <Conversations />
      </div>
    </>
  )
}

export default memo(Sidebar)