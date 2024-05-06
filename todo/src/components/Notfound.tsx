import { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { CgArrowLeft } from "react-icons/cg";

interface props { }

const Notfound: FC<props> = ({ }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center m-auto">
        <div className='text-center'>
          <h1 className="text-lg fi=ont-bold mb-2">Not found</h1>
          <button className="btn btn-sm btn-info mb-3 text-light" onClick={() => navigate("/")}>Home</button>
        </div>
      </div >
    </>
  )
}

export default memo(Notfound)