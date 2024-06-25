import React from 'react'

function Loader() {
  return (
    <div className='absolute text-white font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <h1 className='text-5xl'>Loading...</h1>
    </div>
  )
}

export default Loader