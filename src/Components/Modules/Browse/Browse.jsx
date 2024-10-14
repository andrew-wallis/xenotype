import { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../../App";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import SampleLink from "../../Elements/SampleLink";
import SearchIcon from "../../Elements/Icons/SearchIcon";

function Browse() {


  // React Context

  const {fonts, activeFont, setActiveFont, browsePosition, setBrowsePosition} = useContext(AppContext);

  
  // Variables

  const loadMoreCount = 12;
  const sortOptions = ["Rating", "A-Z"];

  const [filter, setFilter] = useState({
    useage: [],
    classification: [],
    subclassification: [],
    vibe: [],
    licence: []
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(sortOptions[0]);
  const [sortedFonts, setSortedFonts] = useState(sortAndFilterFonts(fonts, filter, sort, search));


  // React Hooks

  const [itemsToShow, setItemsToShow] = useState(
    (sortedFonts.indexOf(activeFont) + 1) > 24 ? sortedFonts.indexOf(activeFont) + 1 : 24
  );

  const {ref, inView} = useInView({
    threshold: 1
  });
  
  useEffect(() => {
    if(inView) {
      setItemsToShow((prevCount) => prevCount + loadMoreCount);
    }
  }, [inView]);

  useEffect(() => {
    window.scrollTo(0, browsePosition);
  }, [activeFont]);

  useEffect(() => {
    const handleScroll = () => {
      setBrowsePosition(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    setSortedFonts(sortAndFilterFonts(fonts, filter, sort, search));
  }, [filter, sort, search]);


  // Functions

  const chooseFont = (font) => {
    setActiveFont(font);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const resetSearch = (e) => {
    e.preventDefault();
    setSearch("");
  }

  return (
    <div className="relative">
      <header className="p-4 sticky z-50 top-0 inset-x-0 bg-dark-bg border-b border-b-dark-text/20">
        <h1 className="text-center uppercase tracking-wider font-semibold text-sm leading-4 mb-4">
          UXType
        </h1>
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <input value={search} placeholder="Search" className="w-full rounded-lg bg-dark-well text-base leading-4 pr-2 pl-8 py-2 text-dark-secondary" onChange={handleSearch} />
            <a onClick={resetSearch} href="#" className="block top-0 left-0 bottom-0 flex items-center justify-center w-8 absolute">
              {search.length === 0 ? 
                <SearchIcon />
              :
                <div className="h-4 w-4 flex justify-center items-center">
                  <span className="absolute bg-dark-secondary h-[1.5px] w-3 rotate-45"></span>
                  <span className="absolute bg-dark-secondary h-[1.5px] w-3 -rotate-45"></span>
                </div>
              }
              
            </a>
          </div>
          <a href="#" className="uppercase tracking-wider text-xs leading-4 text-dark-secondary">Filter</a>
        </div>
      </header>
      <main className="p-4 custom-scrollbar overflow-y-auto touch-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedFonts.slice(0, itemsToShow).map((font, index) => (
            <SampleLink 
              key={index}
              font={font}
              action={chooseFont} />
          ))}
        </div>
        <div ref={ref} className="h-6"></div>
      </main>
    </div>
  );
}

export default Browse;