import { FC, memo } from 'react'
import Content from '../../components/Content'
import ExpenseForm from '../../components/ExpenseForm'

interface props { }

const IncomeAdd: FC<props> = ({ }) => {

  const onSubmit = (input: any) => {
    const params = { ...input, type: "income" }

  }

  return (
    <Content title="Income Add">
      <ExpenseForm onSubmit={onSubmit} />
    </Content>
  )
}

export default memo(IncomeAdd)
