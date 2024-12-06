'use client'

import { SearchIcon } from "@/src/lib/icons";
import { useState } from "react";


interface SearchResult {
  title: string
  foundIn: string
}

const HomepageSearch = () => {

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (e: any) => {
    let value = e.target.value
    console.log(e)
    if (e.code === 'Escape' || value === '') {
      setSearchResults([])
      return
    }

    let tempSearchResults: SearchResult[] = [];
    tempSearchResults = [{title: 'test 1', foundIn: 'Forum'}, {title: 'test 2', foundIn: 'Forum'}]
    setSearchResults(tempSearchResults)


  }

  return (
    <div className="homepage-search-wrapper relative bg-light-pink py-11 px-28">
      <div className="flex items-center gap-4 relative">
        <div className='icon-search absolute left-8'>
          <SearchIcon />
        </div>
        <input
          onKeyUp={handleSearch}
          className="w-full text-base py-[14px] focus:outline-primary outline-4 rounded-full pl-16"
          placeholder="Type your question (e.g. growing up, periods, body changes) to find related posts"
        />
      </div>
      <div className={` ${searchResults.length > 0 ? "block": 'hidden'} absolute bg-white rounded-2xl top-[96px] shadow-lg z-10 search-results p-8`}>
        {searchResults.map((result, index) => (
          <div key={index} className="p-4 border-b border-gray">
            <p className="font-medium text-xl">{result.title}</p>
            <p className="text-m text-gray">in
              <span className="text-primary">{" " + result.foundIn}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomepageSearch;