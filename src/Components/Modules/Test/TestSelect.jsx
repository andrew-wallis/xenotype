import { useEffect, useRef, useState } from "react";
import TestSample from "./TestSample";
import { useInView } from "react-intersection-observer";

function TestSelect({fonts, activeFont, sampleText, chooseFont}) {

  // Variables

  const loadMoreCount = 4;

  // React Hooks

  const [itemsToShow, setItemsToShow] = useState(
    (fonts.indexOf(activeFont) + 1) > 8 ? fonts.indexOf(activeFont) + 1 : 8
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
  }, [activeFont]);

  return (
    <div className={`mb-8 overflow-y-auto custom-scrollbar h-32`}>
      {fonts.slice(0, itemsToShow).map((font, index) => (
        <TestSample key={index} font={font} activeFont={activeFont} sampleText={sampleText} chooseFont={chooseFont} ref={font === activeFont ? activeFontRef : null} />
      ))}
      <div ref={ref} className="h-6"></div>
    </div>
  );
}

export default TestSelect;