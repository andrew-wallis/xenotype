import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import { useInView } from "react-intersection-observer";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import SampleLink from "../../Elements/SampleLink";

function Browse() {

  // React Context

  const context = useContext(AppContext);

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
  const [sortedFonts, setSortedFonts] = useState(sortAndFilterFonts(context.fonts, filter, sort, search));


  // React Hooks

  const [itemsToShow, setItemsToShow] = useState(
    (sortedFonts.indexOf(context.activeFont) + 1) > 24 ? sortedFonts.indexOf(context.activeFont) + 1 : 24
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
  }, [context.activeFont, sortedFonts]);

  const chooseFont = (font) => {
    context.setActiveFont(font);
  }

  return (
    <div className="flex w-full h-full flex-col overflow-hidden">
      <header className="shrink-0 py-4 px-4">
        <h1 className="text-center uppercase tracking-wider font-semibold text-sm leading-4">
          Xenotype
        </h1>
      </header>
      <main className="grow overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedFonts.slice(0, itemsToShow).map((font, index) => (
            <SampleLink 
              key={index}
              font={font}
              sampleText={context.sampleText}
              action={chooseFont}
              ref={font === context.activeFont ? activeFontRef : null} />
          ))}
        </div>
        <div ref={ref} className="h-6"></div>
      </main>
    </div>
  );
}

export default Browse;