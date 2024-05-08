import { FC, memo, useEffect, useState } from 'react'
import Content from '../../components/Content'
import { Controller, useForm } from 'react-hook-form'
import { AiOutlineFile, AiOutlineFileExcel, AiOutlineUser } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import useBlog from "../../hooks/useBlog"
import blogApi from "../../api/blogApi"
import useCategory from "../../hooks/useCategory"
import categoryApi from "../../api/categoryApi"
import useUpload from "../../hooks/useUpload"
import uploadApi from "../../api/uploadApi"
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'

interface props { }

const Add: FC<props> = ({ }) => {
  const { register, control, handleSubmit, reset, setValue } = useForm()
  const { loading, createBlog, fetchBlog, updateBlog } = useBlog()
  const { categoryLoading, fetchAllCategory } = useCategory()
  const { uploadLoading, createUpload } = useUpload()
  const navigate = useNavigate()
  const { op, _id } = useLocation().state || 'add'
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
      const response = await fetchBlog(blogApi.fetch(_id))
      const data = response?.data
      setValue('title', data.title)
      setValue('summary', data.summary)
      setValue('category', data.category._id)
      setValue('cover', data.cover)
      setValue('description', data.description)
    }

    if (op === 'edit' && _id) {
      api()
    }
  }, [op, _id])

  const handleFileUpload = async (input: any) => {
    const response = await createUpload(uploadApi.create(), { upload: input })

    if (response) {
      setValue("cover", response?.data)
    }
  }

  const onSubmit = async (input: any) => {
    if (op === 'edit') {
      const result = await updateBlog(blogApi.update(_id), input)
      if (result) {
        toast.success(result.displayMessage)
        navigate("/blog/list")
      }
    } else {
      const result = await createBlog(blogApi.create(), input)
      if (result) {
        toast.success(result.displayMessage)
        reset()
        navigate("/blog/list")
      }
    }
  }

  return (
    <Content title={op === "edit" ? "Blog Edit" : "Blog Add"}>
      <div className="flex justify-end mb-2">
        <button className="btn btn-info text-light" onClick={() => navigate("/blog/list")}>List</button>
      </div>
      {!loading && !categoryLoading && !uploadLoading && <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-3">
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-1 col-end-4">
          <AiOutlineUser />
          <input type="text" {...register('title')} className="grow" placeholder="Title" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-4 col-end-12">
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
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-1 col-end-12">
          <AiOutlineFileExcel />
          <input type="text" {...register('summary')} className="grow" placeholder="Summary" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-3 col-start-1 col-end-12">
          <AiOutlineFile />
          <input type="file" {...register('cover')} onChange={(e: any) => handleFileUpload(e?.target?.files[0])} className="grow" placeholder="Cover" />
        </label>
        <textarea {...register('description')} placeholder='Description' className="input input-bordered w-full h-32 px-4 py-2 mb-3 col-start-1 col-end-12"></textarea>
        <button className="btn btn-info text-white btn-wide">{op === "edit" ? "Edit" : "Add"}</button>
      </form>}
      {(loading || categoryLoading || uploadLoading) && <Spinner />}
    </Content>
  )
}

export default memo(Add)