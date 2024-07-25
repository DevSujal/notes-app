import React, { useId } from 'react'
import {Input} from '../components'
function Search({className, setSearch, searchContent}) {
  const id = useId();
  return (
    <div className={`flex w-full max-w-screen-sm bg-blue-500/10 rounded overflow-hidden ${className}`}>
    <label htmlFor={id} className='text-2xl p-2 bg-transparent'>🔍</label>
      <Input value = {searchContent} id = {id} onChange = {(e) => setSearch(e.target.value)} placeholder = "Search anything..." style = {{background : "transparent"}} className = "w-full text-white rounded-none"/>
    </div>
  )
}

export default Search
