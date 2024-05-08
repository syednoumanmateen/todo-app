import { FC, memo, useEffect, useState } from 'react'
import Content from '../../components/Content'
import { useNavigate } from 'react-router-dom'
import { BiPencil } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import expenseApi from "../../api/expenseApi"
import useExpense from "../../hooks/useExpense"
import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'
import helper from '../../utility/helper'
import TransactionList from '../../components/TransactionList'

interface props { }

interface stateData {
  _id: string
  totalAmount: number
  list: Array<any>
}

const ExpenseTracker: FC<props> = ({ }) => {
  const navigate = useNavigate()
  const { loading, fetchAllExpense, deleteExpense } = useExpense()
  const [data, setData] = useState([])
  const [expense, setExpense] = useState<stateData | null>(null)
  const [income, setIncome] = useState<stateData | null>(null)
  const [bal, setBal] = useState(0)

  useEffect(() => {
    const apiCall = async () => {
      const response: any = await fetchAllExpense(expenseApi.fetchAll()) || {}
      if (response && response?.data) {
        const expenseLocal = response?.data[0]._id === 'expense' ? response?.data[0] : response?.data[1]
        const incomeLocal = response?.data[0]._id === 'income' ? response?.data[0] : response?.data[1]

        if (helper.isObj(expenseLocal) || helper.isObj(incomeLocal)) {
          setExpense(expenseLocal || {})
          setIncome(incomeLocal || {})
          const expenseList = expenseLocal?.list || []
          const incomeList = incomeLocal?.list || []
          const res: any = [...expenseList, ...incomeList].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
          setData(res?.slice(0, 5))

          const bal = (incomeLocal?.totalAmount) - (expenseLocal?.totalAmount)
          setBal(bal)
        }
      }
    }

    apiCall()
  }, [])

  const handleDelete = async (id: string) => {
    const response = await deleteExpense(expenseApi.delete(id))
    if (response) {
      toast.success(response?.displayMessage)
      window.location.reload()
    }
  }

  return (
    <Content title="Expense Tracker">
      <div className="flex justify-end mb-2">
        <button className="btn btn-info text-light me-2" onClick={() => navigate("/expense/expenseAdd")}>Expense Add</button>
        <button className="btn btn-info text-light" onClick={() => navigate("/expense/incomeAdd")}>Income Add</button>
      </div>
      <div className="container text-center">
        <div className="stats stats-vertical lg:stats-horizontal shadow mb-3">
          <div className="stat">
            <div className="stat-title">Balance</div>
            <div className="stat-value">{bal}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Income</div>
            <div className="stat-value">{income?.totalAmount}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Expense</div>
            <div className="stat-value">{expense?.totalAmount}</div>
          </div>
        </div>

        <div className="container" style={{ paddingLeft: "15%" }}>
          <div className='row g-0'>
            <div className="col-10 px-4">
              <h2 className="text-lg font-semibold rounded p-2 bg-neutral">Last 5 Transactions</h2>
              <ul className="list-group transaction-list bg-light">
                {!loading && data && data.map((exp: any, ind: number) => (
                  <TransactionList key={ind} exp={exp} ind={ind} handleDelete={handleDelete} />
                ))}
              </ul>
              <button className="btn btn-info btn-sm w-full p-2 text-white" onClick={() => { navigate("/expense/list") }}>Show All</button>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </Content >
  )
}

export default memo(ExpenseTracker)