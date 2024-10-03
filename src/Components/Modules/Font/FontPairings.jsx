import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import { useInView } from "react-intersection-observer";
import SampleLink from "../../Elements/SampleLink";

function FontPairings() {


  // React Context
  
  const context = useContext(AppContext);
  const contextFont = useContext(FontContext);


  // Variables

  const loadMoreCount = 12;


  // React Hooks

  const [itemsToShow, setItemsToShow] = useState((contextFont.pairings.indexOf(contextFont.pairing) + 1) > 24 ? contextFont.pairings.indexOf(contextFont.pairing) + 1 : 24);

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
  }, [context.pairing, contextFont.pairings]);


  // Functions

  const choosePairing = (font) => {
    contextFont.setPairing(font);
  }

  return (
    <>
      <div className="pb-4" ref={topRef}></div>
      <div className="grid grid-cols-1 gap-8">
        {contextFont.pairings.slice(0, itemsToShow).map((font, index) => (
          <SampleLink 
            key={index}
            font={font} 
            sampleText={context.sampleText} 
            action={choosePairing}
            inactive={(Object.keys(contextFont.pairing).length > 0 && contextFont.pairing !== font ? true : false)} 
            ref={font === contextFont.pairing ? activeFontRef : null} 
          />
        ))}
      </div>
      <div ref={ref} className="h-6"></div>
    </>
  );
}

export default FontPairings;