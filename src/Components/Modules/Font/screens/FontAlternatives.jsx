import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AppContext } from "../../../../App";
import { FontContext } from "../Font";
import SampleLink from "../../../Elements/SampleLink";
import FontHeader from "../FontHeader";

function FontAlternatives() {
  

  // React Context

  const {activeFont, setActiveFont} = useContext(AppContext);
  const {alternatives, alternative, setAlternative, setActiveModule, modules} = useContext(FontContext);


  // Variables

  const loadMoreCount = 5;


  // React Hooks

  const [itemsToShow, setItemsToShow] = useState((alternatives.indexOf(alternative) + 1) > 10 ? alternatives.indexOf(alternative) + 1 : 10);

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

  const resetAlternative = () => {
    setAlternative({});
  }

  return (
    <>
      <FontHeader>
        <SampleLink 
          font={activeFont}
          action={resetAlternative}
          inactive={(Object.keys(alternative).length > 0 && alternative !== activeFont ? true : false)}
        />
      </FontHeader>
      <main className="px-4 pb-4">
        <div className="grid grid-cols-1 gap-8">
          {alternatives.slice(0, itemsToShow).map((font) => (
            <SampleLink 
              key={font.label}
              font={font}
              action={chooseAlternative} 
              inactive={(Object.keys(alternative).length > 0 && alternative !== font ? true : false)}
            />
          ))}
        </div>
        <div ref={ref} className="h-6"></div>
      </main>
    </>
  );
}

export default FontAlternatives;