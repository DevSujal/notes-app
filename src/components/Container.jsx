import React from 'react'
function Container({className, children}) {
  return (
  <div className={`flex flex-col text-white base-color ${className}`}>
      {children}
    </div>
  )
}

export default Container
