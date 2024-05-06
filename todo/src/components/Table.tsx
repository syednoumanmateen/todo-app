import { FC, memo, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useTodo from '../hooks/useTodo';
import Spinner from './Spinner';
import todoApi from "../api/todoApi"
import toast from 'react-hot-toast';

interface props {
  headings: any[],
  data: any
}

const Table: FC<props> = ({ headings, data }) => {
  const navigate = useNavigate()
  const { loading, deleteTodo } = useTodo()

  const [currentPage, setCurrentPage] = useState(1);
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
    const response = await deleteTodo(todoApi.delete(id))
    if (response) {
      toast.success(response?.displayMessage)
      window.location.reload()
    }
  }

  return (
    <>
      {!loading && <>
        <table className="w-full bg-gray-700 text-white rounded">
          <thead className='bg-dark p-3'>
            <tr>
              {headings.map((head, ind) => (
                <th className='p-2' key={ind}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((td: any, ind: number) => (
              <tr key={ind}>
                <th className='p-2 ps-3'>{indexOfFirstItem + ind + 1}</th>
                <td className='p-2'>{td?.name || "-"}</td>
                <td className='p-2'>{td?.description || "-"}</td>
                <td className='p-2'>{td?.status || "-"}</td>
                <td className='p-2'>
                  <button className="btn btn-ghost p-0" onClick={() => navigate(`/todo/view/${td?._id}`)}>
                    <BiPencil className='text-xl text-amber-600' />
                  </button>
                  <button className="btn btn-ghost p-0" onClick={() => handleDelete(td?._id)}>
                    <AiOutlineDelete className='text-xl text-rose-700' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
}

export default memo(Table)  