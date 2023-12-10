import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoIosPlayCircle } from 'react-icons/io'

function SongList({index,item,setCurrentURL,setCurrentCover,setCurrentName}) {

    const playCurrentSong=()=>{
        setCurrentURL(item.url)
        setCurrentCover(item.cover)
        setCurrentName(item.name)       
    }

  return (
    <div key={index} className='grid grid-cols-12 mx-8 my-0 text-xs border-b-2 py-2 flex items-center justify-center'>
    <div className='col-span-5'>
        <img src={item.cover} alt="" className='w-12 h-12 inline mr-4'/>
        {item.name}
    </div>
    <div className='col-span-2'>
        {item.source}
    </div>
    <div className='col-span-2'>
        {item.date}
    </div>
    <div className='col-span-2' >
        <IoIosPlayCircle className='text-secondary hover:text-yellow-600 cursor-pointer text-[2.5rem]' onClick={playCurrentSong}/>
    </div>
    <div className='col-span-1'>
        <AiOutlineDelete className=' text-slate-500 text-lg cursor-pointer hover:text-slate-700'/>
    </div>
</div>
  )
}

export default SongList