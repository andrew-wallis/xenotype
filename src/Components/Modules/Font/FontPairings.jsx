import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import SampleLink from "../../Elements/SampleLink";
import FontHeader from "./FontHeader";

function FontPairings() {


  // React Context

  const {activeFont, setActiveFont, sampleText} = useContext(AppContext);
  const {pairing, pairings, modules, setActiveModule, setPairing} = useContext(FontContext);


  // Variables

  const loadMoreCount = 5;


  // React Hooks

  const [itemsToShow, setItemsToShow] = useState((pairings.indexOf(pairing) + 1) > 10 ? pairings.indexOf(pairing) + 1 : 10);

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

  const resetPairing = () => {
    setPairing({});
  }

  return (
    <>
      <FontHeader>
        <SampleLink 
          font={activeFont}
          sampleText={sampleText} 
          action={resetPairing}
        />
      </FontHeader>
      <main className="px-4 pb-4">
        <div className="grid grid-cols-1 gap-8">
          {pairings.slice(0, itemsToShow).map((font, index) => (
            <SampleLink 
              key={index}
              font={font} 
              sampleText={sampleText} 
              action={choosePairing}
              inactive={(Object.keys(pairing).length > 0 && pairing !== font ? true : false)} 
            />
          ))}
        </div>
        <div ref={ref} className="h-6"></div>
      </main>
    </>
  );
}

export default FontPairings;