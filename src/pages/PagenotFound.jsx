import React from 'react'
import { Button } from '../components'
import { useNavigate } from 'react-router-dom'

function PagenotFound() {

    const navigate = useNavigate()
    const navigateToHome = () => {
        navigate("/")
    }
  return (
    <div className='bg-black/70 flex-grow text-white flex justify-center items-center'>
      <div className='md:w-2/4 w-3/4 flex flex-col gap-3 justify-center items-center'>
        <h1 className='text-9xl animate-bounce'>😵</h1>
        <h1 className='text-4xl'>OOPS!</h1>
        <p className='text-lg text-center'>The page you are looking for might have been removed or had its name changed or its temporarily unavailable .</p>
        <Button className='w-fit rounded-full font-semibold hover:opacity-70' onClick = {navigateToHome}>Go To Homepage</Button>
      </div>
    </div>
  )
}

export default PagenotFound
