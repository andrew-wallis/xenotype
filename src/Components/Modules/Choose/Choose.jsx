import { useEffect, useState } from "react";
import sortAndFilterFonts from "./helpers/sortAndFilterFonts";
import ChooseSample from "./ChooseSample";
import ChooseFilters from "./ChooseFilters";

function Choose({fonts, sampleText, setActivePrimaryFont, setActiveSecondaryFont, changeModule, showFilters, sort}) {



  //  React Hooks

  const [sortedFonts, setSortedFonts] = useState([]);
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


  return (
    <div className="">
      <div className="max-w-[68rem] mx-auto">
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