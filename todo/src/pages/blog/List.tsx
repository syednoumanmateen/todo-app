import { FC, memo, useEffect, useState } from 'react'
import Blog from '../../components/Blog'
import Content from '../../components/Content'
import { useNavigate } from 'react-router-dom'
import useBlog from '../../hooks/useBlog'
import blogApi from '../../api/blogApi'
import Spinner from '../../components/Spinner'
import Notfound from '../../components/Notfound'

interface props { }

const List: FC<props> = ({ }) => {
  const { loading, fetchAllBlog } = useBlog()
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const apiCall = async () => {
      const response = await fetchAllBlog(blogApi.fetchAll())
      if (response) {
        setData(response?.data)
      }
    }

    apiCall()
  }, [])

  return (
    <>
      <Content title="Blog List">
        <div className="flex justify-end mb-2">
          <button className="btn btn-accent text-light" onClick={() => navigate("/blog/add")}>Add</button>
        </div>
        <div className="overflow-scroll hide-scrollbar h-95">
          {loading && <Spinner />}
          {!loading && data ? <Blog data={data} /> : <Notfound />}
        </div>
      </Content>
    </>
  )
}

export default memo(List)