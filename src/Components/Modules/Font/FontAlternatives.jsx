import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import SampleLink from "../../Elements/SampleLink";
import { useInView } from "react-intersection-observer";

function FontAlternatives() {
  

  // React Context

  const context = useContext(AppContext);
  const contextFont = useContext(FontContext);


  // Variables

  const loadMoreCount = 12;


  // React Hooks

  const [itemsToShow, setItemsToShow] = useState((contextFont.alternatives.indexOf(contextFont.alternative) + 1) > 24 ? context.alternatives.indexOf(contextFont.alternative) + 1 : 24);

  const activeFontRef = useRef(null);
  const topRef = useRef(null);

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
    } else if(topRef.current) {
      topRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest'
      })
    }
  }, [context.alternative, context.alternatives]);


  // Functions

  const chooseAlternative = (font) => {
    contextFont.setAlternative(font);
  }

  return (
    <>
      <div className="pb-4" ref={topRef}></div>
      <div className="grid grid-cols-1 gap-8">
        {contextFont.alternatives.slice(0, itemsToShow).map((font) => (
          <SampleLink 
            key={font.label}
            font={font}
            sampleText={context.sampleText} 
            action={chooseAlternative} 
            inactive={(Object.keys(contextFont.alternative).length > 0 && contextFont.alternative !== font ? true : false)} 
            ref={font === contextFont.alternative ? activeFontRef : null} 
          />
        ))}
      </div>
      <div ref={ref} className="h-6"></div>
    </>
  );
}

export default FontAlternatives;