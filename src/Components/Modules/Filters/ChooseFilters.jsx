import { act, useEffect, useRef, useState } from "react";
import FilterSelect from "./FilterSelect";
import updateFilters from "./helpers/updateFilters";
import SortSelect from "./SortSelect";
import ResetIcon from "../../Elements/Icons/ResetIcon";
import FilterIcon from "../../Elements/Icons/FilterIcon";
import Icon from "../../Elements/Icon";
import SearchIcon from "../../Elements/Icons/SearchIcon";

function ChooseFilters({showFilters, setShowFilters, filter, setFilter, sort, setSort, sortOptions, search, setSearch}) {

  const [open, setOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if(containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [containerRef]);

  useEffect(() => {
    let active = 0;
    if(search) {
      active += 1;
    }
    Object.entries(filter).map(([key, val]) => {
      val.length > 0 ? active += 1 : false;
    });

    setActiveFilters(active);
  }, [filter, search]);

  const handleFilter = (term, key) => {
    setFilter(updateFilters(filter, term, key));
  }

  const handleResetFilter = () => {
    if(activeFilters > 0) {
      setOpen(false);
      const updateFilter = {...filter};
      Object.entries(updateFilter).map(([key, val]) => {
        val.length = 0;
      });
      console.log(updateFilter);
      setFilter(updateFilter);
      setSearch("");
    }
  }

  function handleToggleFilters () {
    setOpen(false);
    setShowFilters(!showFilters);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const typeOptions = {
    "Sans": {
      "Humanist": "Humanist",
      "Grotesque": "Grotesque",
      "Geometric": "Geometric",
    },
    "Serif": {
      "Old Style": "Old Style",
      "Transitional": "Transitional",
      "Modern": "Modern",
      "Contemporary": "Contemporary",
      "Slab": "Slab"
    },
    "Mono": "Mono"
  }

  const vibeOptions = {
    "Neutral": "Neutral",
    "Quirky": "Quirky",
    "Elegant": "Elegant",
    "Technical": "Technical"
  }

  const licenceOptions = {
    "Google": "Google",
    "Adobe": "Adobe"
  }

  return (
    <>
      <div className={`rounded-full relative sm:h-auto transition-[height] duration-300 ease-out ${showFilters ? "h-auto" : "h-[44px]"}`} ref={containerRef}>
        <div className={`relative sm:absolute inset-0  z-10 flex flex-col sm:flex-row justify-start sm:justify-end pl-1 py-1 pr-[3.5rem] gap-4 duration-300 transition-all ease-out ${showFilters ? "opacity-100" : "opacity-0"}`}>
          <div className="relative flex-1">
            <input value={search} placeholder="Search" className="w-full rounded-full bg-gray-200 text-xs leading-[1.125rem] pl-[1.125rem] pr-[36px] py-[0.5625rem] text-gray-800" onChange={(e) => handleSearch(e)} />
            <a onClick={(e) => {e.preventDefault; setSearch(search)}} href="#" className="block top-0 right-0 bottom-0 flex items-center justify-center w-[36px] absolute">
              <SearchIcon />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <FilterSelect options={typeOptions} id="classification" subId="subclassification" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Type</FilterSelect>
            <FilterSelect options={vibeOptions} id="vibe" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Vibe</FilterSelect>
            <FilterSelect options={licenceOptions} id="licence" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Licence</FilterSelect>
            <a onClick={(e) => {e.preventDefault; handleResetFilter()}} className={`icon relative text-gray-600 h-9 w-9 rounded-full flex items-center justify-center bg-gray-200 ${activeFilters > 0 ? "" : "opacity-50 cursor-default"}`} href="#">
              <ResetIcon />
              {activeFilters > 0 &&
                <div className="icon-label absolute top-full pt-2 w-[96px] flex justify-center">
                  <div className="flex py-1.5 px-3 rounded-[4px] bg-gray-100 text-gray-700 font-medium text-sm leading-4 text-center">
                    Reset
                  </div>
                </div>
              }
            </a>
          </div>
          <SortSelect sort={sort} setSort={setSort} sortOptions={sortOptions} open={open} setOpen={setOpen}>Sort</SortSelect>
        </div>
        <div className={`absolute top-0 right-0 z-10 border-4 rounded-full  ${showFilters ? "border-transparent" : "border-transparent"}`}>
          <a onClick={(e) => {e.preventDefault; handleToggleFilters()}} className={`icon relative text-gray-600 h-9 w-9 rounded-full flex items-center justify-center ${showFilters ? "bg-gray-200" : activeFilters > 0 ? "bg-gray-200 text-gray-700" : "bg-gray-100"}`} href="#">
            <FilterIcon />
            <div className="icon-label absolute top-full pt-2 w-[96px] flex justify-center">
              <div className="flex py-1.5 px-3 rounded-[4px] bg-gray-100 text-gray-700 font-medium text-sm leading-4 text-center">
                <div>
                  <div>Filters</div>
                  {activeFilters > 0 && <div>{`(${activeFilters} applied)`}</div>}
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="absolute top-0 right-0 bottom-0 left-0 rounded-[22px] overflow-x-hidden sm:relative sm:h-[44px] sm:rounded-full">
          <div className={`absolute inset-0 z-0 bg-gray-100 duration-300 transition-all ease-out ${showFilters ? "translate-y-0 " : "translate-x-full"}`}></div>
        </div>
      </div>
    </>
  );
}

export default ChooseFilters;