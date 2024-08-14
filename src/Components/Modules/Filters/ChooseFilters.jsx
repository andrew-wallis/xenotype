import { useEffect, useRef, useState } from "react";
import Icon from "../../Elements/Icon";
import FilterSelect from "./FilterSelect";
import updateFilters from "./helpers/updateFilters";
import SortSelect from "./SortSelect";
import ResetIcon from "../../Elements/Icons/ResetIcon";
import FilterIcon from "../../Elements/Icons/FilterIcon";

function ChooseFilters({showFilters, setShowFilters, filter, setFilter, sort, setSort, sortOptions}) {

  const [open, setOpen] = useState(false);
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

  const handleFilter = (term, key) => {
    setFilter(updateFilters(filter, term, key));
  }

  const handleResetFilter = () => {

    if(getActiveFilters()) {
      setOpen(false);
      const updateFilter = {...filter};
      Object.entries(updateFilter).map(([key, val]) => {
        val.length = 0;
      });
      console.log(updateFilter);
      setFilter(updateFilter);
    }

  }

  function handleToggleFilters () {
    setOpen(false);
    setShowFilters(!showFilters);
  }

  function getActiveFilters() {
    let active = false;
    Object.entries(filter).map(([key, val]) => {
      val.length > 0 ? active = true : false;
    });
    return active;
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
      <div className="rounded-full relative" ref={containerRef}>
        <div className={`absolute inset-0  z-10 flex justify-end pl-1 py-1 pr-[3.5rem] gap-4 duration-300 transition-all ease-out ${showFilters ? "opacity-100" : "opacity-0"}`}>
          <div className="flex-1 rounded-full bg-gray-200 text-xs leading-[1.125rem] px-[1.125rem] py-[0.5625rem] uppercase tracking-wider font-semibold text-gray-800">Search</div>
          <div className="flex gap-2">
            <FilterSelect options={typeOptions} id="classification" subId="subclassification" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Type</FilterSelect>
            <FilterSelect options={vibeOptions} id="vibe" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Vibe</FilterSelect>
            <FilterSelect options={licenceOptions} id="licence" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Licence</FilterSelect>
            <a onClick={(e) => {e.preventDefault; handleResetFilter()}} className={`text-gray-600 h-9 w-9 rounded-full flex items-center justify-center bg-gray-200 ${getActiveFilters() ? "" : "opacity-50 cursor-default"}`} href="#">
              <ResetIcon />
            </a>
          </div>
          <SortSelect sort={sort} setSort={setSort} sortOptions={sortOptions} open={open} setOpen={setOpen}>Sort</SortSelect>
        </div>
        <div className={`absolute top-0 right-0 z-20 border-4 rounded-full  ${showFilters ? "border-transparent" : "border-transparent"}`}>
          <a onClick={(e) => {e.preventDefault; handleToggleFilters()}} className={`text-gray-600 h-9 w-9 rounded-full flex items-center justify-center ${showFilters ? "bg-gray-200" : getActiveFilters() ? "bg-gray-400 text-gray-700" : "bg-gray-100"}`} href="#">
            <FilterIcon />
          </a>
        </div>
        <div className="overflow-x-hidden h-[44px] relative rounded-full">
          <div className={`absolute inset-0 z-5 bg-gray-100 duration-300 transition-all ease-out ${showFilters ? "translate-y-0 " : "translate-x-full"}`}></div>
        </div>
      </div>
    </>
  );
}

export default ChooseFilters;