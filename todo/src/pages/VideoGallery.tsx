import { memo, FC, useState } from 'react'

interface props { }

const VideoGallery: FC<props> = ({ }) => {
  const gallery = [
    "https://www.youtube.com/embed/x57C8ljz8ts?si=shmkYoHGpJ72cqwB",
    "https://www.youtube.com/embed/d1N-W2BLlRs?si=_CVaGGYDRoKTJ9N6",
    "https://www.youtube.com/embed/vBwFQ-M9mTg?si=O8tQf-9aobRw5ldq",
    "https://www.youtube.com/embed/rvoUeOgsh3I?si=NXmpuBjcCiIPMfuU",
    "https://www.youtube.com/embed/Oppxp_oPg6k?si=HVyy-HaWosRdK2ow",
    "https://www.youtube.com/embed/uEDm8GM8ZCg?si=E8pGBcY9MU6rZKiQ",
    "https://www.youtube.com/embed/xmbxe0Jtxmc?si=veZXl5JtDGtg4iFP",
    "https://www.youtube.com/embed/gHFY1zOeZjQ?si=j2T0Bt9EPsOtPyIw",
    "https://www.youtube.com/embed/fgMhIw0G0xk?si=LXW8gzaIXDLW5SGh",
    "https://www.youtube.com/embed/ezlbjhHj9yI?si=b9Zr2cPxRIqDzGze",
    "https://www.youtube.com/embed/_jzuDTcKIMI?si=rR09LaQyW6yHF50n"
  ]
  const [visibilityItems, setVisibilityItems] = useState(10)
  const [loading, setLoading] = useState(false)

  const handleScroll = () => {
    setLoading(true)
    setTimeout(() => {
      setVisibilityItems(prev => gallery.length >= prev ? prev + 10 : prev)
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <div className="row g-0">
        {gallery.slice(0, visibilityItems).map((i: string, ind: number) => (
          <div className="col-4 mb-3" key={ind}>
            <iframe key={ind} className='rounded' width="420" height="250" src={i} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          </div>
        ))}
        <button className="btn btn-sm btn-info w-full p-2 text-white" onClick={handleScroll}>{loading ? 'Load more...' : 'Load more'}</button>
      </div>
    </>
  )
}

export default memo(VideoGallery)