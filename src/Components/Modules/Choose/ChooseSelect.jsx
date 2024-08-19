import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ChooseSample from "./ChooseSample";

function ChooseSelect({fonts, activeFont, chooseFont, setModal, sampleText}) {

  // Variables

  const loadMoreCount = 12;

  // React Hooks

  const [itemsToShow, setItemsToShow] = useState(
    (fonts.indexOf(activeFont) + 1) > 24 ? fonts.indexOf(activeFont) + 1 : 24
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

/*   useEffect(() => {
    if(activeFontRef.current) {
      activeFontRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest'
      })
    }
  }, [activeFont, fonts]); */

  return (
    <main className="custom-scrollbar overflow-y-auto flex-1 transition-[width] duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
        {fonts.slice(0, itemsToShow).map((font, index) => (
          <ChooseSample key={index} font={font} sampleText={sampleText} chooseFont={chooseFont} setModal={setModal} ref={font === activeFont ? activeFontRef : null}/>
        ))}
      </div>
      <div ref={ref} className="h-6"></div>
    </main>
  );
}

export default ChooseSelect;