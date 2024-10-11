import { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../../App";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import SampleLink from "../../Elements/SampleLink";

function Browse() {


  // React Context

  const {fonts, activeFont, setActiveFont, browsePosition, setBrowsePosition} = useContext(AppContext);

  
  // Variables

  const loadMoreCount = 4;
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
    (sortedFonts.indexOf(activeFont) + 1) > 12 ? sortedFonts.indexOf(activeFont) + 1 : 12
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


  // Functions

  const chooseFont = (font) => {
    setActiveFont(font);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden touch-none">
      <header className="shrink-0 p-4 py-4 px-4 touch-auto">
        <h1 className="text-center uppercase tracking-wider font-semibold text-sm leading-4">
          Xenotype
        </h1>
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