import { FC, memo } from 'react'
import Content from '../../components/Content'
import ExpenseForm from '../../components/ExpenseForm'
import { useNavigate } from 'react-router-dom'

interface props { }

const ExpenseAdd: FC<props> = ({ }) => {
  const onSubmit = (input: any) => {
    const params = { ...input, type: "expense" }
  }


  return (
    <Content title="Expense Add">
      <ExpenseForm onSubmit={onSubmit} />
    </Content>
  )
}

export default memo(ExpenseAdd)