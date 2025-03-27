import React, { useId } from "react";
import { Input } from "../components";
import { Search as SearchComponent } from "lucide-react";
import { setSearch } from "../Store/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
function Search({ className }) {
  const dispatch = useDispatch();
  const searchContent = useSelector((state) => state.searchReducer.searchText);
  const id = useId();
  return (
    <>
      <SearchComponent
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
      />
      <Input
        value={searchContent}
        id={id}
        onChange={(e) => dispatch(setSearch({ searchText: e.target.value }))}
        placeholder="Search notes..."
        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </>
  );
}

export default Search;
