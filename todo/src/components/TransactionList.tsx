import { FC, memo } from 'react'
import { BiPencil } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns';

interface props {
  exp: any
  ind: number
  handleDelete: (id: string) => void
}

const TransactionList: FC<props> = ({ exp, ind, handleDelete }) => {
  const navigate = useNavigate()

  return (
    <li key={ind} className={`list-group-item  ${exp.type === 'income' ? 'border-l-4 border-l-accent' : 'border-l-4 border-l-error'}`}>
      <div className="row g-0 d-flex align-items-center">
        <div className="col-1">
          {ind + 1}
        </div>
        <div className={`col-3 ${exp.type === 'income' ? 'text-accent' : 'text-error'}`}>{exp?.name}
        </div>
        <div className="col-2">
          {exp?.type}
        </div>
        <div className="col-2">
          ${exp?.amount}
        </div>
        <div className="col-3">
          {format(exp?.date, 'MMM d, yyyy')}
        </div>
        <div className="col-1">
          <div>
            <button className="btn btn-ghost p-0" onClick={() => navigate(exp?.type === 'income' ? `/expense/incomeAdd` : `/expense/expenseAdd`, { state: { op: "edit", _id: exp?._id } })}> <BiPencil className='text-xl text-amber-600' /></button>
            <button className="btn btn-ghost p-0" onClick={() => { handleDelete(exp?._id) }}> <AiOutlineDelete className='text-xl text-rose-700' /></button>
          </div>
        </div>
      </div>
    </li >
  );
}

export default memo(TransactionList)  