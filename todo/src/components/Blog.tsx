import { FC, memo, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import blogApi from "../api/blogApi"
import Spinner from './Spinner';

interface props {
  data: any
}

const Blog: FC<props> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, deleteBlog } = useBlog()
  const navigate = useNavigate()
  const itemsPerPage = 10

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(5, totalPages);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - 4);
  }

  const handleDelete = async (id: string) => {
    const response = await deleteBlog(blogApi.delete(id))
    if (response) {
      toast.success(response?.displayMessage)
      window.location.reload()
    }
  }

  return (
    <>
      {!loading && <>
        {currentItems?.map((blg: any, ind: number) => (
          <div key={ind} className="card card-side bg-base-100 shadow-xl mb-4 text-light">
            <figure className="img"><img src={blg?.coverImg} alt="Album" /></figure>
            <div className="card-body">
              <h2 className="card-title">{blg?.title || "-"}</h2>
              <h5>{blg?.summary || "-"}</h5>
              <h3>{blg?.category.name || "-"}</h3>
              <p>{blg?.description || "-"}</p>
            </div>
            <div className="card-actions justify-end pe-2">
              <button className="btn btn-ghost p-0" onClick={() => navigate(`/blog/view/${blg?._id}`)}> <BiPencil className='text-xl text-amber-600' /></button>
              <button className="btn btn-ghost p-0" onClick={() => handleDelete(blg?._id)}> <AiOutlineDelete className='text-xl text-rose-700' /></button>
            </div>
          </div>
        ))}
        <div className="mt-2 flex justify-end">
          <div className="join">
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => (
              <button key={index} className={`join-item btn ${currentPage === startPage + index ? 'btn-active' : ''}`} onClick={() => setCurrentPage(startPage + index)}
              >{startPage + index}</button>
            ))}
          </div>
        </div>
      </>}
      {loading && <Spinner />}
    </>
  )
}

export default memo(Blog)