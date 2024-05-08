import { FC, memo, useEffect, useState } from 'react'
import Table from '../../components/Table'
import Content from '../../components/Content'
import useTodo from '../../hooks/useTodo'
import todoApi from "../../api/todoApi"
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import Notfound from '../../components/Notfound'

interface props { }

const List: FC<props> = ({ }) => {
  const { loading, fetchAllTodo } = useTodo()
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const apiCall = async () => {
      const response = await fetchAllTodo(todoApi.fetchAll())
      if (response) {
        setData(response.data)
      }
    }

    apiCall()
  }, [])

  return (
    <>
      <Content title="Todo List">
        <div className="flex justify-end">
          <button className="btn btn-accent text-light" onClick={() => navigate("/todo/add")}>Add</button>
        </div>
        <div className="rounded-lg m-3">
          {loading && <Spinner />}
          {!loading && data ? <Table headings={['Sl No', 'Name', 'Description', 'Status', 'actions']} data={data} /> : <Notfound />}
        </div>
      </Content>
    </>
  )
}

export default memo(List)