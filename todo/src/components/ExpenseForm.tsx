import { FC, memo, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineUser } from 'react-icons/ai'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { useLocation, useNavigate } from 'react-router-dom'
import useCategory from "../hooks/useCategory"
import categoryApi from "../api/categoryApi"
import Spinner from './Spinner'

interface props {
  onSubmit: (e:any) => void
}

const ExpenseForm: FC<props> = ({ onSubmit }) => {
  const { register, control, handleSubmit, reset, setValue } = useForm()
  const navigate = useNavigate()
  const { op, _id } = useLocation().state || 'add'
  const { categoryLoading, fetchAllCategory } = useCategory()
  const typOptions = [{ name: "Select Type", value: "" }, { name: "Expense", value: "expense" }, { name: "Income", value: "income" }]
  const [options, setOptions] = useState([{ name: "Select Category", value: "" }])

  useEffect(() => {
    const api = async () => {
      const response = await fetchAllCategory(categoryApi.fetchAll())
      if (response) {
        const data = response?.data.map((i: any) => ({ name: i.name, value: i._id }))
        setOptions([{ name: "Select Category", value: "" }, ...data])
      }
    }

    api()
  }, [])

  return (
    <>
      <div className="flex justify-end mb-2">
        <button className="btn btn-info text-light" onClick={() => navigate("/expense/list")}>List</button>
      </div>
      {!categoryLoading && <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-3">
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-1 col-end-4">
          <AiOutlineUser />
          <input type="text" {...register('name')} className="grow" placeholder="Name" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-4 col-end-12">
          <LiaRupeeSignSolid />
          <input type="text" {...register('amount')} className="grow" placeholder="Amount" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-1 col-end-12">
          <Controller name="category" control={control} defaultValue="select..."
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
        {/* <label className="input input-bordered flex items-center gap-2 mb-3 col-start-4 col-end-12">
          <Controller name="type" control={control} defaultValue="select..."
            render={({ field }) => (
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-transparent border-0 sm:text-sm rounded-md"
                {...field}>
                {typOptions.map((opt: any, ind: number) => (
                  <option key={ind} className="bg-black mt-1 block w-full pl-3 pr-10 py-10 text-base" value={opt.value}>{opt.name}</option>
                ))}
              </select>
            )}
          />
        </label> */}
        <textarea {...register('description')} placeholder='Description' className="input input-bordered w-full h-32 px-4 py-2 mb-3 col-start-1 col-end-12"></textarea>
        <button className="btn btn-info text-white btn-wide">{op === "edit" ? "Edit" : "Add"}</button>
      </form>}
      {categoryLoading && <Spinner />}
    </>
  )
}

export default memo(ExpenseForm)