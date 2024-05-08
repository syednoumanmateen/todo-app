import { FC, memo, useEffect, useState } from 'react'
import Content from '../../components/Content'
import { useNavigate } from 'react-router-dom'
import expenseApi from "../../api/expenseApi"
import useExpense from "../../hooks/useExpense"
import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'
import helper from '../../utility/helper'
import TransactionList from '../../components/TransactionList'

interface props { }

const ExpenseList: FC<props> = ({ }) => {
  const navigate = useNavigate()
  const { loading, fetchAllExpense, deleteExpense } = useExpense()
  const [data, setData] = useState([])
  const [scrollLoading, setScrollLoading] = useState(false)
  const [visibleItems, setVisibleItems] = useState(10);

  useEffect(() => {
    const apiCall = async () => {
      const response: any = await fetchAllExpense(expenseApi.fetchAll()) || {}
      if (response && response?.data) {
        const expense = response?.data[0] || {}
        const income = response?.data[1] || {}

        if (helper.isObj(expense) || helper.isObj(income)) {
          const expenseList = expense?.list || []
          const incomeList = income?.list || []
          const res: any = [...expenseList, ...incomeList].sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
          setData(res)
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

  const handleScroll = () => {
    setScrollLoading(true)
    setTimeout(() => {
      setVisibleItems(prev => data.length > prev ? prev + 10 : prev)
      setScrollLoading(false)
    }, 1000)
  };

  return (
    <Content title="Expense List">
      <div className="flex justify-end mb-2">
        <button className="btn btn-info text-light me-2" onClick={() => navigate("/expense/dashboard")}>Home</button>
      </div>

      <h2 className="text-lg rounded font-semibold bg-rounded p-2">Transactions</h2>
      <ul className="list-group transaction-list bg-light h-82 overflow-scroll hide-scrollbar" onScroll={handleScroll}>
        {!loading && data && data.slice(0, visibleItems).map((exp: any, ind: number) => (
          <TransactionList key={ind} exp={exp} ind={ind} handleDelete={handleDelete} />
        ))}
      </ul>
      <button className="btn btn-sm btn-info w-full p-2 text-white" onClick={handleScroll}>{scrollLoading ? 'Load more...' : 'Load more'}</button>
      {loading && <Spinner />}
    </Content >
  )
}

export default memo(ExpenseList)