import { FC, memo, useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import userApi from '../../api/userApi'
import Spinner from '../../components/Spinner'

interface props { }

interface userData {
  _id:string
  name: string
  email: string
  gender: string
  profileImg: any
}

const Profile: FC<props> = ({ }) => {
  const { loading, profile } = useUser()
  const [data, setData] = useState<userData | null>(null)

  useEffect(() => {
    const apiCall = async () => {
      const response = await profile(userApi.fetch())
      if (response) {
        setData(response?.result?.data)
      }
    }

    apiCall()
  }, [])

  return (
    <>
      {!loading && <>
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-2">
            {
              <div className="flex justify-center">
                <img className="h-32 w-32 rounded-full object-cover" src={data?.profileImg} alt={data?.name} />
              </div>
            }
            <div className="text-center mt-4">
              <h1 className="text-xl font-semibold text-gray-800">{data?.name}</h1>
              <div className="text-sm text-gray-600">{data?.email}</div>
              <div className="text-sm text-gray-600">{data?.gender}</div>
            </div>
          </div>
        </div>
      </>}
      {loading && <Spinner />}
    </>
  )
}

export default memo(Profile)