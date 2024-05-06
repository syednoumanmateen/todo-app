import { FC, memo, useEffect, useState } from 'react'
import Content from '../../components/Content'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import useBlog from '../../hooks/useBlog'
import blogApi from '../../api/blogApi'

interface props { }

interface BlogData {
  _id: string;
  coverImg: any;
  title: string;
  summary: string;
  description: string;
  category: any;
}

const View: FC<props> = ({ }) => {
  const navigate = useNavigate()
  const { loading, fetchBlog } = useBlog()
  const { id } = useParams()
  const [data, setData] = useState<BlogData | null>(null);

  useEffect(() => {
    const api = async () => {
      if (id != undefined) {
        const response = await fetchBlog(blogApi.fetch(id))
        setData(response?.data)
      }
    }

    api()
  }, [id])

  return (
    <Content title="Blog View">
      <div className="flex justify-end mb-2">
        <button className="btn btn-info text-light me-2" onClick={() => navigate("/blog/list")}>List</button>
        <button className="btn btn-warning text-light" onClick={() => navigate("/blog/add", { state: { op: 'edit', _id: data?._id } })}>Edit</button>
      </div>
      {!loading && <div><img className='img' src={data?.coverImg} />{data?.title},{data?.description},{data?.summary},{data?.category?.name}</div>}
      {loading && <Spinner />}
    </Content>
  )
}

export default memo(View)