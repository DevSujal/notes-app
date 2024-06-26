import React from 'react'

function Container({className, children}) {
  return (
    <div className={`w-full h-screen flex flex-col flex-shrink min-h-screen bg-black ${className}`}>
      {children}
    </div>
  )
}

export default Container
