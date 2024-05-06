import { FC, memo, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineUser } from 'react-icons/ai'
import Content from '../../components/Content'
import useTodo from '../../hooks/useTodo'
import todoApi from "../../api/todoApi"
import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

interface props { }

const options = [{ name: "Select...", value: "" },
{ name: "Draft", value: "Draft" },
{ name: "Processing", value: "Processing" },
{ name: "Completed", value: "Completed" }
]

const Add: FC<props> = ({ }) => {
  const { register, control, handleSubmit, reset, setValue } = useForm()
  const { loading, createTodo, fetchTodo, updateTodo } = useTodo()
  const navigate = useNavigate()
  const { op, _id } = useLocation().state || 'add'

  useEffect(() => {
    const api = async () => {
      const response = await fetchTodo(todoApi.fetch(_id))
      const data = response?.data
      setValue('name', data.name)
      setValue('status', data.status)
      setValue('description', data.description)
    }

    if (op === 'edit') {
      api()
    }
  }, [op, _id])

  const onSubmit = async (input: any) => {
    if (op === 'edit') {
      const result = await updateTodo(todoApi.update(_id), input)
      if (result) {
        toast.success(result.displayMessage)
        navigate("/todo/list")
      }
    } else {
      const result = await createTodo(todoApi.create(), input)
      if (result) {
        toast.success(result.displayMessage)
        reset()
        navigate("/todo/list")
      }
    }
  }

  return (
    <Content title={op === "edit" ? "Todo Edit" : "Todo Add"}>
      <div className="flex justify-end mb-2">
        <button className="btn btn-info text-light" onClick={() => navigate("/todo/list")}>List</button>
      </div>
      {!loading && <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-3">
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-1 col-end-4">
          <AiOutlineUser />
          <input type="name" {...register('name')} className="grow" placeholder="Name" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-4 col-end-12">
          <Controller name="dropdown" control={control} defaultValue="Draft"
            render={({ field }) => (
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-transparent border-0 sm:text-sm rounded-md"
                {...field}>
                {options.map((opt: any, ind: number) => (
                  <option key={ind} className="bg-black mt-1 block w-full pl-3 pr-10 py-10 text-base" value={opt.value}>{opt.name}</option>
                ))}
              </select>
            )}
          />
        </label>
        <textarea {...register('description')} placeholder='Description' className="input input-bordered w-full h-32 px-4 py-2 mb-3 col-start-1 col-end-12"></textarea>
        <button className="btn btn-info text-white btn-wide">{op === "edit" ? "Edit" : "Add"}</button>
      </form>}
      {loading && <Spinner />}
    </Content>
  )
}

export default memo(Add)