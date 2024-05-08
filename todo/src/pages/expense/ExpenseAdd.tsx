import { FC, memo } from 'react'
import Content from '../../components/Content'
import ExpenseForm from '../../components/ExpenseForm'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import expenseApi from "../../api/expenseApi"
import useExpense from "../../hooks/useExpense"
import { useForm } from 'react-hook-form'
import Spinner from '../../components/Spinner'

interface props { }

const ExpenseAdd: FC<props> = ({ }) => {
  const { reset } = useForm()
  const { loading, createExpense, updateExpense } = useExpense()
  const navigate = useNavigate()
  const { op, _id } = useLocation().state || 'add'

  const onSubmit = async (input: any) => {
    if (op === 'edit') {
      const params = { ...input }
      const result = await updateExpense(expenseApi.update(_id), params)
      if (result) {
        toast.success(result.displayMessage)
        navigate("/expense/dashboard")
      }
    } else {
      const params = { ...input, type: "expense" }
      const result = await createExpense(expenseApi.create(), params)
      if (result) {
        toast.success(result?.displayMessage)
        reset()
        navigate("/expense/dashboard")
      }
    }
  }

  return (
    <Content title={op === 'edit' ? "Expense Edit" : "Expense Add"}>
      {!loading && <ExpenseForm onSubmit={onSubmit} op={op} _id={_id} />}
      {loading && <Spinner />}
    </Content>
  )
}

export default memo(ExpenseAdd)