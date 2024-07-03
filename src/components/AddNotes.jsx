import React from 'react'
import { Link } from 'react-router-dom'

function AddNotes() {
  return (
    <Link to="/new" className='rounded-full flex justify-center items-center  cursor-pointer w-20 h-20 fixed bottom-6 bg-transparent font-bold'>
      <span style={{textShadow : "0 0 0 #5AD9A9"}} className="text-transparent sm:text-5xl text-4xl z-10 ">➕</span>
    </Link>
  )
}

export default AddNotes
