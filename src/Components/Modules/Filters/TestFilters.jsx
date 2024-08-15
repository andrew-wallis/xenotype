import { useEffect, useRef, useState } from "react";
import FilterSelect from "./FilterSelect";
import updateFilters from "./helpers/updateFilters";
import ResetIcon from "../../Elements/Icons/ResetIcon";
import FilterIcon from "../../Elements/Icons/FilterIcon";

function TestFilters({showFilters, setShowFilters, filter, setFilter}) {

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
    "Sans": "Sans",
    "Serif": "Serif",
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
    <div className="relative">
      <div className={`rounded-full h-full bg-transparen absolute top-0 left-0 flex-1 duration-300 transition-none ease-out ${showFilters ? "w-[370px]" : "w-[44px]"}`} ref={containerRef}>
        <div className={`absolute inset-0 z-10 flex justify-end pr-1 py-1 pl-[3.5rem] gap-4 duration-300 transition-all ease-out w-[370px] ${showFilters ? "opacity-100" : "opacity-0"}`}>
          <div className="flex gap-2">
            <FilterSelect options={typeOptions} id="classification" subId="subclassification" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Type</FilterSelect>
            <FilterSelect options={vibeOptions} id="vibe" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Vibe</FilterSelect>
            <FilterSelect options={licenceOptions} id="licence" open={open} setOpen={setOpen} filter={filter} handleFilter={handleFilter}>Licence</FilterSelect>
            <a onClick={(e) => {e.preventDefault; handleResetFilter()}} className={`text-gray-600 h-9 w-9 rounded-full flex items-center justify-center bg-gray-200 ${getActiveFilters() ? "" : "opacity-50 cursor-default"}`} href="#">
              <ResetIcon />
            </a>
          </div>
        </div>
        <div className={`absolute top-0 left-0 z-20 border-4 rounded-full  ${showFilters ? "border-transparent" : "border-transparent"}`}>
          <a onClick={(e) => {e.preventDefault; handleToggleFilters()}} className={`text-gray-600 h-9 w-9 rounded-full flex items-center justify-center ${showFilters ? "bg-gray-200" : getActiveFilters() ? "bg-gray-200 text-gray-700" : "bg-gray-100"}`} href="#">
            <FilterIcon />
          </a>
        </div>
        <div className={`overflow-x-hidden h-[44px] relative rounded-full duration-300 transition-all ease-out ${showFilters ? "w-[370px]" : "w-[44px]"}`}>
          <div className={`absolute inset-0 z-5 bg-gray-100 duration-300 transition-all ease-out ${showFilters ? "translate-y-0 " : "-translate-x-full"}`}></div>
        </div>
      </div>
    </div>
  );
}

export default TestFilters;