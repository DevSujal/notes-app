import React from 'react'
import {Input} from '../components'
function Search({className, setSearch, searchContent}) {
  return (
    <div className={`flex w-6/12 min-w-80 rounded overflow-hidden ${className}`}>
    <span className='text-2xl p-2 bg-black'>🔍</span>
      <Input value = {searchContent} onChange = {(e) => setSearch(e.target.value)} placeholder = "Search anything..." className = "w-full bg-black text-white rounded-none"/>
    </div>
  )
}

export default Search
