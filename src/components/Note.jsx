import React from 'react'

function Note({title, content, className}) {
  return (
    <div className={`w-full cursor-pointer text-white rounded p-3 bg-gray-900 min-w-80 ${className}`}>
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="ml-1 text-xs text-gray-400">{content}</span>
    </div>
  )
}

export default Note
