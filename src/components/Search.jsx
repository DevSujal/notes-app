import React from 'react'
import Input from './Input'
import search from "../assets/search.jpg"
function Search({className, setSearch, searchContent}) {
  return (
    <div className={`flex w-6/12 min-w-96 rounded text-white overflow-hidden ${className}`}>
    <img src={search} alt="search img" width={50} className='object-cover' />
      <Input value = {searchContent} onChange = {(e) => setSearch(e.target.value)} placeholder = "Search anything..."className = "w-full text-black  rounded-none"/>
    </div>
  )
}

export default Search
