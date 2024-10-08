import { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../../App";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import SampleLink from "../../Elements/SampleLink";

function Browse() {

  // React Context

  const {fonts, activeFont, setActiveFont, sampleText, browsePosition, setBrowsePosition} = useContext(AppContext);

  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = browsePosition;
    }
  }, [activeFont]);

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

  const activeFontRef = useRef(null);

  const {ref, inView} = useInView({
    threshold: 1
  });
  
  useEffect(() => {
    if(inView) {
      setItemsToShow((prevCount) => prevCount + loadMoreCount);
    }
  }, [inView]);

  useEffect(() => {
    if(activeFontRef.current) {
      activeFontRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest'
      })
    }
  }, [activeFont, sortedFonts]);


  // Functions

  const handleScroll = (e) => {
    setBrowsePosition(mainRef.current.scrollTop);
  };

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
      <main 
        className="p-4 custom-scrollbar overflow-y-auto touch-auto"
        onScroll={(e) => {handleScroll(e)}}
        ref={mainRef}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedFonts.slice(0, itemsToShow).map((font, index) => (
            <SampleLink 
              key={index}
              font={font}
              sampleText={sampleText}
              action={chooseFont}
              ref={font === activeFont ? activeFontRef : null} />
          ))}
        </div>
        <div ref={ref} className="h-6"></div>
      </main>
    </div>
  );
}

export default Browse;