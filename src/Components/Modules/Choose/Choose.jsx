import { useEffect, useState } from "react";
import sortAndFilterFonts from "./helpers/sortAndFilterFonts";
import ChooseSample from "./ChooseSample";

function Choose({fonts, sampleText, setActivePrimaryFont, setActiveSecondaryFont, changeModule}) {


  // Variables

  const sortOptions = ["Rating", "A-Z"];
  const classifications = ["Sans", "Serif", "Mono"];


  //  React Hooks

  const [sortedFonts, setSortedFonts] = useState([]);
  const [fontSort, setFontSort] = useState(sortOptions[0]);
  const [fontFilter, setFontFilter] = useState({
    classification: []
  });

  useEffect(() => {
    setSortedFonts(sortAndFilterFonts(fonts, fontFilter, fontSort));
  }, [fonts, fontFilter, fontSort]);


  // Functions

  const chooseFont = (font) => {
    setActivePrimaryFont(font);
    setActiveSecondaryFont({});
    changeModule("Pair");
  }


  // Local functions

  function handleSelect(e) {
    setFontSort(e.target.value);
  }

  function handleCheckbox(filter) {
    const updateFontFilter = {...fontFilter};

    if(!updateFontFilter.classification.includes(filter)) {
      updateFontFilter.classification.push(filter);
    } else {
      const filterIndex = updateFontFilter.classification.indexOf(filter);
      updateFontFilter.classification.splice(filterIndex, 1);
    }

    setFontFilter(updateFontFilter);
  }


  return (
    <div className="max-w-[68rem] mx-auto">
      <div className="flex justify-between mb-16">
        <div className="flex gap-2">
          {classifications.map((filter) => (
            <div key={filter}>
              <input className="sr-only" id={filter} type="checkbox" name="classification" value={filter} defaultChecked={fontFilter.classification.includes(filter)} onChange={() => handleCheckbox(filter)} />
              <label className={`block rounded-full py-2.5 px-5 uppercase tracking-wider text-sm leading-5 font-bold cursor-pointer ${fontFilter.classification.includes(filter) ? "bg-gray-200" : "bg-gray-100"}`} htmlFor={filter}>{filter}</label>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="p-px absolute top-2.5 right-2.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10L12 6H4L8 10Z" fill="currentColor"/>
            </svg>
          </div>
          <label htmlFor="sort" className="sr-only">Filter</label>
          <select className="appearance-none rounded-full py-2.5 pr-10 pl-5 bg-gray-100 uppercase tracking-wider text-sm leading-5 font-bold" id="sort" value={fontSort} onChange={(e) => handleSelect(e)}>
            {sortOptions.map((sortOption) => (
              <option key={sortOption} value={sortOption}>{sortOption}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-9">
        {sortedFonts.map(([fontKey, font]) => (
          <ChooseSample key={fontKey} font={font} sampleText={sampleText} chooseFont={chooseFont} />
        ))}
      </div>
    </div>
  );
}

export default Choose;