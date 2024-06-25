import React from 'react'
import { Link } from 'react-router-dom'

function AddNotes() {
  return (
    <Link to={"/new"} className='rounded-full flex justify-center items-center sm:pb-3 cursor-pointer w-20 h-20 absolute bottom-6 text-center text-white bg-gray-800 text-5xl font-bold'>
      <span>+</span>
    </Link>
  )
}

export default AddNotes
