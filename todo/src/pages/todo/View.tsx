import { FC, memo, useEffect, useState } from 'react'
import Content from '../../components/Content'
import { useNavigate, useParams } from 'react-router-dom'
import useTodo from '../../hooks/useTodo'
import Spinner from '../../components/Spinner'
import todoApi from "../../api/todoApi"

interface props { }

interface TodoData {
  _id: string;
  name: string;
  description: string;
  status: string;
}

const View: FC<props> = ({ }) => {
  const navigate = useNavigate()
  const { loading, fetchTodo } = useTodo()
  const { id } = useParams()
  const [data, setData] = useState<TodoData | null>(null);

  useEffect(() => {
    const api = async () => {
      if (id != undefined) {
        const response = await fetchTodo(todoApi.fetch(id))
        setData(response?.data)
      }
    }

    api()
  }, [id])

  return (
    <Content title="Todo View">
      <div className="flex justify-end">
        <button className="btn btn-info text-light me-2" onClick={() => navigate("/todo/list")}>List</button>
        <button className="btn btn-warning text-light" onClick={() => navigate("/todo/add", { state: { op: "edit", _id: data?._id } })}>Edit</button>
      </div>
      {!loading && <div>{data?.name},{data?.description},{data?.status}</div>}
      {loading && <Spinner />}
    </Content>
  )
}

export default memo(View)