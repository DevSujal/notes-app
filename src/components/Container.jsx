import React from 'react'

function Container({className, children}) {
  return (
    <div className={`w-full h-full min-h-screen flex flex-col flex-shrink bg-black ${className}`}>
      {children}
    </div>
  )
}

export default Container
