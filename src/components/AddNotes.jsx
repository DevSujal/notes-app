import React from 'react'
import { Link } from 'react-router-dom'

function AddNotes() {
  return (
    <Link to="/new" className='rounded-full flex justify-center items-center  cursor-pointer w-20 h-20 fixed bottom-6 text-center text-white bg-slate-950 opacity-70  font-bold'>
      <span style={{textShadow : "0 0 0 lightgreen"}} className="text-transparent sm:text-5xl text-3xl">➕</span>
    </Link>
  )
}

export default AddNotes
