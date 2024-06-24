import React from 'react'

function Container({className, children}) {
  return (
    <div className={`w-screen h-screen bg-black ${className}`}>
      {children}
    </div>
  )
}

export default Container
