import { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import SampleLink from "../../Elements/SampleLink";

function FontAlternatives() {
  

  // React Context

  const {setActiveFont, sampleText} = useContext(AppContext);
  const {alternatives, alternative, setAlternative, setActiveModule, modules} = useContext(FontContext);


  // Variables

  const loadMoreCount = 5;


  // React Hooks

  const [itemsToShow, setItemsToShow] = useState((alternatives.indexOf(alternative) + 1) > 10 ? alternatives.indexOf(alternative) + 1 : 10);

  const activeFontRef = useRef(null);

  const {ref, inView} = useInView({
    threshold: 1
  });

  useEffect(() => {
    if(inView) {
      setItemsToShow((prevCount) => prevCount + loadMoreCount);
    }
  }, [inView]);

  // Functions

  const chooseAlternative = (font) => {
    if(alternative === font) {
      setActiveFont(font);
      setActiveModule(modules[0]);
    } else {
      setAlternative(font);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {alternatives.slice(0, itemsToShow).map((font) => (
          <SampleLink 
            key={font.label}
            font={font}
            sampleText={sampleText} 
            action={chooseAlternative} 
            inactive={(Object.keys(alternative).length > 0 && alternative !== font ? true : false)} 
            ref={font === alternative ? activeFontRef : null} 
          />
        ))}
      </div>
      <div ref={ref} className="h-6"></div>
    </>
  );
}

export default FontAlternatives;