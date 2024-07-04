import React from 'react'
import bg from "../assets/bg.webp"
function Container({className, children}) {
  return (
  <div style={{background : `url(${bg})`, backgroundRepeat : "no-repeat", backgroundSize : "cover"}} className={`w-full h-full min-h-screen min-w-screen flex flex-col  ${className}`}>
      {children}
    </div>
  )
}

export default Container
