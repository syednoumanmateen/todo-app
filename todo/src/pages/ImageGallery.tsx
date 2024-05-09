import { memo, FC, useState } from 'react'

interface props { }

const ImageGallery: FC<props> = ({ }) => {
  const gallery = [
    "https://static.wikia.nocookie.net/onepiece/images/1/17/Monkey_D._Luffy%27s_Seventh_Wanted_Poster.png/revision/latest/scale-to-width-down/76?cb=20231212105248",
    "https://static.wikia.nocookie.net/onepiece/images/5/5d/Roronoa_Zoro%27s_Current_Wanted_Poster.png/revision/latest/scale-to-width-down/75?cb=20161222000618",
    "https://static.wikia.nocookie.net/onepiece/images/3/3b/Nami%27s_Current_Wanted_Poster.png/revision/latest/scale-to-width-down/73?cb=20160619204508",
    "https://static.wikia.nocookie.net/onepiece/images/5/5e/God_Usopp%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/73?cb=20160619204644",
    "https://static.wikia.nocookie.net/onepiece/images/c/ca/Sanji%27s_Current_Wanted_Poster.png/revision/latest/scale-to-width-down/77?cb=20240319052415",
    "https://static.wikia.nocookie.net/onepiece/images/e/e6/Tony_Tony_Chopper%27s_Second_Wanted_Poster.png/revision/latest/scale-to-width-down/73?cb=20160619204650",
    "https://static.wikia.nocookie.net/onepiece/images/b/b8/Nico_Robin%27s_Current_Wanted_Poster.png/revision/latest/scale-to-width-down/75?cb=20161222000656",
    "https://static.wikia.nocookie.net/onepiece/images/e/ee/Franky%27s_Third_Wanted_Poster.png/revision/latest/scale-to-width-down/75?cb=20240319052347",
    "https://static.wikia.nocookie.net/onepiece/images/0/09/Brook%27s_Concert_Wanted_Poster.png/revision/latest/scale-to-width-down/73?cb=20160619204634",
    "https://static.wikia.nocookie.net/onepiece/images/7/71/Jinbe%27s_Current_Wanted_Poster.png/revision/latest/scale-to-width-down/76?cb=20240319052509",
    "https://static.wikia.nocookie.net/onepiece/images/6/62/Luffy_Wanted_Poster.png/revision/latest/scale-to-width-down/76?cb=20130513214806",
    "https://static.wikia.nocookie.net/onepiece/images/8/85/Monkey_D._Luffy%27s_Sixth_Wanted_Poster.png/revision/latest/scale-to-width-down/78?cb=20190414060316",
    "https://static.wikia.nocookie.net/onepiece/images/a/a6/Zoro%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/76?cb=20130209003647",
    "https://static.wikia.nocookie.net/onepiece/images/4/48/Nami%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/76?cb=20130203045140",
    "https://static.wikia.nocookie.net/onepiece/images/9/9f/Usopp%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/76?cb=20130211163408",
    "https://static.wikia.nocookie.net/onepiece/images/d/db/Sanji%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/76?cb=20130210030218",
    "https://static.wikia.nocookie.net/onepiece/images/e/e9/Sanji_Only_Alive_Poster.png/revision/latest/scale-to-width-down/75?cb=20191102000134",
    "https://static.wikia.nocookie.net/onepiece/images/8/8b/Vinsmoke_Sanji%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/78?cb=20190331050119",
    "https://static.wikia.nocookie.net/onepiece/images/3/3e/Tony_Tony_Chopper%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/75?cb=20121224005609",
    "https://static.wikia.nocookie.net/onepiece/images/5/56/Robin%27s_First_Wanted_Poster.png/revision/latest/scale-to-width-down/81?cb=20240303070459",
    "https://static.wikia.nocookie.net/onepiece/images/5/55/Nico_Robin%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/76?cb=20130211163508",
    "https://static.wikia.nocookie.net/onepiece/images/1/1d/Franky%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/75?cb=20130624084046",
    "https://static.wikia.nocookie.net/onepiece/images/e/e0/Cyborg_Franky%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/73?cb=20160619204639",
    "https://static.wikia.nocookie.net/onepiece/images/5/5a/Brook_Alive_Bounty_Poster.png/revision/latest/scale-to-width-down/76?cb=20231010221741",
    "https://static.wikia.nocookie.net/onepiece/images/3/34/Jinbe%27s_Wanted_Poster.png/revision/latest/scale-to-width-down/100?cb=20180731164329"
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
      <div className="row g-5">
        {gallery.slice(0, visibilityItems).map((i: string, ind: number) => (
          <div className="col-4" key={ind}>
            <img key={ind} className='rounded' width="420" height="250" src={i} alt='image' />
          </div>
        ))}
        <button className="btn btn-sm btn-info w-full p-2 text-white" onClick={handleScroll}>{loading ? 'Load more...' : 'Load more'}</button>
      </div>
    </>
  )
}

export default memo(ImageGallery)