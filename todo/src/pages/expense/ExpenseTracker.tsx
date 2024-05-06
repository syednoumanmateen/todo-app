import { FC, memo } from 'react'
import Content from '../../components/Content'
import { useNavigate } from 'react-router-dom'
import { BiPencil } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'

interface props { }

const ExpenseTracker: FC<props> = ({ }) => {
  const navigate = useNavigate()

  return (
    <Content title="Expense Tracker">
      <div className="flex justify-end mb-2">
        <button className="btn btn-info text-light me-2" onClick={() => navigate("/expense/expenseAdd")}>Expense Add</button>
        <button className="btn btn-info text-light" onClick={() => navigate("/expense/incomeAdd")}>Income Add</button>
      </div>
      <div>
        
        {/* <button className="btn btn-ghost p-0" onClick={() => navigate(``)}> <BiPencil className='text-xl text-amber-600' /></button>
      <button className="btn btn-ghost p-0" onClick={() => { }}> <AiOutlineDelete className='text-xl text-rose-700' /></button> */}
      </div>
    </Content>
  )
}

export default memo(ExpenseTracker)