import { useEffect, useState } from "react";
import sortAndFilterFonts from "./helpers/sortAndFilterFonts";
import ChooseSample from "./ChooseSample";
import ChooseFilters from "./ChooseFilters";

function Choose({fonts, sampleText, setActivePrimaryFont, setActiveSecondaryFont, changeModule}) {


  // Variables

  const sortOptions = ["Rating", "A-Z"];


  //  React Hooks

  const [sortedFonts, setSortedFonts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]);
  const [filter, setFilter] = useState({
    classification: [],
    subclassification: [],
    vibe: [],
    licence: []
  });

  useEffect(() => {
    setSortedFonts(sortAndFilterFonts(fonts, filter, sort));
  }, [fonts, filter, sort]);


  // Functions

  const chooseFont = (font) => {
    setActivePrimaryFont(font);
    setActiveSecondaryFont({});
    changeModule("Pair");
  }

  const handleFilter = (term, key) => {
    const updatefilter = {...filter};

    if(!updatefilter[key].includes(term)) {
      updatefilter[key].push(term);
    } else {
      const filterIndex = updatefilter[key].indexOf(term);
      updatefilter[key].splice(filterIndex, 1);

      if(term === "Sans") {
        const sansSubclass = ["Humanist", "Grotesque", "Geometric"];
        sansSubclass.forEach(subTerm => {
          const subTermIndex = updatefilter.subclassification.indexOf(subTerm);
          if(subTermIndex !== -1) {
            updatefilter.subclassification.splice(filterIndex, 1);
          }
        });
      }

      if(term === "Serif") {
        const sansSubclass = ["Old Style", "Transitional", "Modern", "Contemporary"];
        sansSubclass.forEach(subTerm => {
          const subTermIndex = updatefilter.subclassification.indexOf(subTerm);
          if(subTermIndex !== -1) {
            updatefilter.subclassification.splice(filterIndex, 1);
          }
        });
      }
    }

    setFilter(updatefilter);
  }


  // Local functions

  function handleSelect(e) {
    setSort(e.target.value);
  }


  return (
    <div className="">
      <div className="max-w-[68rem] mx-auto">
        <div className="flex justify-between mb-16">
          <button onClick={(e) => {e.preventDefault(); setShowFilters(!showFilters)}} className="rounded-full py-2 px-4 uppercase tracking-wider text-xs leading-4 font-bold bg-gray-100">Filters</button>
          <div className="relative">
            <div className="p-px absolute top-1.5 right-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10L12 6H4L8 10Z" fill="currentColor"/>
              </svg>
            </div>
            <label htmlFor="sort" className="sr-only">Filter</label>
            <select className="appearance-none rounded-full py-2 pr-8 pl-4 bg-gray-100 uppercase tracking-wider text-xs leading-4 font-bold" id="sort" value={sort} onChange={(e) => handleSelect(e)}>
              {sortOptions.map((sortOption) => (
                <option key={sortOption} value={sortOption}>{sortOption}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <aside className={`transition-[width] duration-300 ease-out ${showFilters ? "w-40 mr-4" : "w-0 mr-0"} `}>
            {showFilters && 
              <ChooseFilters 
                filter={filter}
                handleFilter={handleFilter}
              />
            }
          </aside>
          <main className="flex-1 transition-[width] duration-300 grid grid-cols-3 gap-9">
            {sortedFonts.map(([fontKey, font]) => (
              <ChooseSample key={fontKey} font={font} sampleText={sampleText} chooseFont={chooseFont} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Choose;