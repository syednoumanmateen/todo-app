import { FC, ReactNode, memo } from "react"

interface props {
  children: ReactNode,
  title: string
}

const Content: FC<props> = ({ children, title }) => {
  return (
    <div className="h-sys-screen">
      <div className="border rounded-md border-gray-700 h-full">
        <h1 className="text-lg font-bold py-3 flex justify-center">{title}</h1>
        <div className="px-3 py-2 h-90">
          {children}
        </div>
      </div >
    </div>
  )
}

export default memo(Content)