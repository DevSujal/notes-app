import React from 'react'
import Input from './Input'
function Search({className, setSearch, searchContent}) {
  return (
    <div className={`flex w-6/12 min-w-80 rounded overflow-hidden ${className}`}>
    <span className='text-2xl p-2 bg-slate-900'>🔍</span>
      <Input value = {searchContent} onChange = {(e) => setSearch(e.target.value)} placeholder = "Search anything..." className = "w-full bg-slate-900 hover:bg-slate-900 text-white rounded-none"/>
    </div>
  )
}

export default Search
