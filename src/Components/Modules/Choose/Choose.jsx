import { useContext, useEffect, useRef, useState } from "react";
import { WindowContext } from "../../../Window";
import ChooseSample from "./ChooseSample";
import ChooseFilters from "./ChooseFilters";
import updateFilters from "./helpers/updateFilters";
import sortAndFilterFonts from "./helpers/sortAndFilterFonts";

function Choose({showFilters, sort, setModal}) {
  
  //  React Hooks

  const context = useContext(WindowContext);

  const [sortedFonts, setSortedFonts] = useState([]);
  const [displayFont, setDisplayFonts] = useState([]);
  const [filter, setFilter] = useState({
    classification: [],
    subclassification: [],
    vibe: [],
    licence: []
  });

  useEffect(() => {
    setSortedFonts(sortAndFilterFonts(context.fonts, filter, sort));
  }, [context.fonts, filter, sort]);

  useEffect(() => {
    //setDisplayFonts(sortedFonts.slice(0, 24));
    setDisplayFonts(sortedFonts);
  }, [sortedFonts]);

  const chooseSamplesRef = useRef(null);


  // Functions

  const chooseFont = (font) => {
    context.setChosenFont(font);
    context.changeModule("Pair");
  }

  const handleFilter = (term, key) => {
    setFilter(updateFilters(filter, term, key));
  }

  const handleScroll = () => {
    // const {scrollTop, scrollHeight, clientHeight} = chooseSamplesRef.current;
    // if(scrollTop + clientHeight >= scrollHeight - 5 ) {
    //   const newItems = sortedFonts.slice(displayFont.length, displayFont.length + 12);
    //   setDisplayFonts((prevItems) => [...prevItems, ...newItems]);
    // }
  }

  return (
    <div className="flex overflow-hidden w-full max-w-[68rem] mx-auto">
      <aside className={`custom-scrollbar overflow-y-auto transition-[width] duration-300 ease-out ${showFilters ? "w-48 mr-6 px-4" : "w-0 mr-0"} `}>
        {showFilters &&
          <ChooseFilters filter={filter} handleFilter={handleFilter} />
        }
      </aside>
      <main ref={chooseSamplesRef} onScroll={handleScroll} className="custom-scrollbar overflow-y-auto flex-1 transition-[width] duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 px-4">
          {displayFont.map(([fontKey, font]) => (
            <ChooseSample key={fontKey} font={font} sampleText={context.sampleText} chooseFont={chooseFont} setModal={setModal} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Choose;