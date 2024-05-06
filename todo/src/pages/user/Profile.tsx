import { FC, memo, useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import userApi from '../../api/userApi'
import Spinner from '../../components/Spinner'

interface props { }

const Profile: FC<props> = ({ }) => {
  const { loading, profile } = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    const apiCall = async () => {
      const response = await profile(userApi.fetch())
      if (response) {
        setData(response.data)
      }
    }

    apiCall()
  }, [])

  return (
    <>
      {!loading && <>
        {data}
      </>}
      {loading && <Spinner />}
    </>
  )
}

export default memo(Profile)