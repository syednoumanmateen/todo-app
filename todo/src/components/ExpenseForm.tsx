import { FC, memo, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineUser } from 'react-icons/ai'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { useNavigate } from 'react-router-dom'
import useCategory from "../hooks/useCategory"
import categoryApi from "../api/categoryApi"
import Spinner from './Spinner'
import useExpense from "../hooks/useExpense"
import expenseApi from "../api/expenseApi"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

interface props {
  onSubmit: (e: any) => void,
  op: string,
  _id: string
}

const ExpenseForm: FC<props> = ({ onSubmit, op = "add", _id }) => {
  const { register, control, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()
  const { categoryLoading, fetchAllCategory } = useCategory()
  const { loading, fetchExpense } = useExpense()
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

  useEffect(() => {
    const api = async () => {
      const response = await fetchExpense(expenseApi.fetch(_id))
      const data = response?.data?.list[0]
      setValue('name', data.name)
      setValue('amount', data.amount)
      setValue('date', new Date(data.date))
      setValue('category', data.category._id)
      setValue('description', data.description)
    }

    if (op === 'edit' && _id) {
      api()
    }
  }, [op, _id])

  return (
    <>
      <div className="flex justify-end mb-2">
        <button className="btn btn-info text-light" onClick={() => navigate("/expense/dashboard")}>Home</button>
      </div>
      {!loading && !categoryLoading && <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-3">
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-1 col-end-4">
          <AiOutlineUser />
          <input type="text" {...register('name')} className="grow" placeholder="Name" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-4 col-end-12">
          <LiaRupeeSignSolid />
          <input type="text" {...register('amount')} className="grow" placeholder="Amount" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-1 col-end-4">
          <Controller name="category" control={control} defaultValue="select..."
            render={({ field }) => (
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-transparent border-0 sm:text-sm rounded-md"                {...field}>
                {options.map((opt: any, ind: number) => (
                  <option key={ind} className="bg-black mt-1 block w-full pl-3 pr-10 py-10 text-base" value={opt.value}>{opt.name}</option>
                ))}
              </select>
            )}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-4 col-end-12">
          <Controller name="date" control={control}
            render={({ field }) => (
              <DatePicker {...field} selected={field.value} onChange={(date: any) => field.onChange(date)} dateFormat="yyyy-MM-dd" />
            )}
          />
        </label>
        <textarea {...register('description')} placeholder='Description' className="input input-bordered w-full h-32 px-4 py-2 mb-3 col-start-1 col-end-12"></textarea>
        <button className="btn btn-info text-white btn-wide">{op === "edit" ? "Edit" : "Add"}</button>
      </form>}
      {loading && categoryLoading && <Spinner />}
    </>
  )
}

export default memo(ExpenseForm)