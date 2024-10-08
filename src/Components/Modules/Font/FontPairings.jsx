import { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import SampleLink from "../../Elements/SampleLink";

function FontPairings() {


  // React Context

  const {setActiveFont, sampleText} = useContext(AppContext);
  const {pairing, pairings, modules, setActiveModule, setPairing} = useContext(FontContext);


  // Variables

  const loadMoreCount = 5;


  // React Hooks

  const [itemsToShow, setItemsToShow] = useState((pairings.indexOf(pairing) + 1) > 10 ? pairings.indexOf(pairing) + 1 : 10);

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

  const choosePairing = (font) => {
    if(pairing === font) {
      setActiveFont(font);
      setActiveModule(modules[0]);
    } else {
      setPairing(font);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {pairings.slice(0, itemsToShow).map((font, index) => (
          <SampleLink 
            key={index}
            font={font} 
            sampleText={sampleText} 
            action={choosePairing}
            inactive={(Object.keys(pairing).length > 0 && pairing !== font ? true : false)} 
            ref={font === pairing ? activeFontRef : null} 
          />
        ))}
      </div>
      <div ref={ref} className="h-6"></div>
    </>
  );
}

export default FontPairings;