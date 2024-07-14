import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import ChooseSample from "./ChooseSample";
import ChooseFilters from "./ChooseFilters";
import updateFilters from "./helpers/updateFilters";
import sortAndFilterFonts from "./helpers/sortAndFilterFonts";

function Choose({showFilters, sort}) {
  
  //  React Hooks

  const context = useContext(AppContext);

  const [sortedFonts, setSortedFonts] = useState([]);
  const [filter, setFilter] = useState({
    classification: [],
    subclassification: [],
    vibe: [],
    licence: []
  });

  useEffect(() => {
    setSortedFonts(sortAndFilterFonts(context.fonts, filter, sort));
  }, [context.fonts, filter, sort]);


  // Functions

  const chooseFont = (font) => {
    context.setChosenFont(font);
    context.changeModule("Pair");
  }

  const handleFilter = (term, key) => {
    setFilter(updateFilters(filter, term, key));
  }

  return (
    <div className="">
      <div className="max-w-[68rem] mx-auto">
        <div className="flex">
          <aside className={`transition-[width] duration-300 ease-out ${showFilters ? "w-40 mr-4" : "w-0 mr-0"} `}>
            {showFilters &&
              <ChooseFilters filter={filter} handleFilter={handleFilter} />
            }
          </aside>
          <main className="flex-1 transition-[width] duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
              {sortedFonts.map(([fontKey, font]) => (
                <ChooseSample key={fontKey} font={font} sampleText={context.sampleText} chooseFont={chooseFont} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Choose;