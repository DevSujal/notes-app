import React from 'react'
import { Link } from 'react-router-dom'

function AddNotes() {
  return (
    <Link to="/new" className='w-20 h-20 rounded-full text-center sm:pt-0 pt-2 fixed bottom-6 bg-black/70 font-bold'>
      <span  className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sm:text-7xl text-6xl z-10 ">+</span>
    </Link>
  )
}

export default AddNotes
