import { useEffect, useState } from "react";
import sortAndFilterFonts from "./helpers/sortAndFilterFonts";
import ChooseSample from "./ChooseSample";

function Choose({fonts, sampleText, setActivePrimaryFont, setActiveSecondaryFont, changeModule}) {

  //  React Hooks

  const [sortedFonts, setSortedFonts] = useState([]);
  const [fontSort, setFontSort] = useState("Rating");
  const [fontFilter, setFontFilter] = useState({
    classification: []
  });

  useEffect(() => {
    setSortedFonts(sortAndFilterFonts(fonts, fontFilter, fontSort));
  }, [fonts, fontFilter, fontSort]);

  const chooseFont = (font) => {
    setActivePrimaryFont(font);
    setActiveSecondaryFont({});
    changeModule("Pair");
  }


  return (
    <>
      <header className="my-16 relative">
        <h1 className="uppercase tracking-wider font-black text-center leading-5">Choose</h1>
      </header>
      <div className="grid grid-cols-3 gap-9">
        {sortedFonts.map(([fontKey, font]) => (
          <ChooseSample key={fontKey} font={font} sampleText={sampleText} chooseFont={chooseFont} />
        ))}
      </div>
    </>
  );
}

export default Choose;