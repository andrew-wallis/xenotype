import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../App";
import TestTemplate from "./TestTemplate";
import CTA from "../../Elements/CTA";
import TestSelect from "./TestSelect";

function Test() {

  // React Hooks

  const context = useContext(AppContext);
  const ref = useRef(null);

  useEffect(() => {
    if(ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [context.template]);

  // Functions

  const choosePrimaryFont = (font) => {
    if(font !== context.primaryFont) {
      context.setPrimaryFont(font);
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== context.secondaryFont) {
      context.setSecondaryFont(font);
    }
  }

  const enablePairings = () => {
    context.setPairing(true);
  }

  const disablePairing = () => {
    context.setPairing(false);
    context.setSwap(false);
  }

  const handleSwap = () => {
    context.setSwap(!context.swap);
  }

  const getFonts = () => {
    context.setModal({
      type: "GetFonts",
      content: {
        primaryFont: context.primaryFont,
        secondaryFont: context.secondaryFont
      }
    })
  }

  return (
    <div className="w-full flex overflow-hidden max-w-[68rem] sm:px-4 mx-auto">
      <aside className="hidden md:block w-56 mr-6 pr-4">
        <div className="flex gap-4 mb-8 text-gray-800">
          {context.pairing ?
            <>
              <a href="#" className="uppercase tracking-wider font-bold text-xs leading-none" onClick={(e) => {e.preventDefault; disablePairing()}}>Stop Pairing</a>            
              <a href="#" className={`uppercase tracking-wider font-bold text-xs leading-none ${context.swap ? "opacity-100" : "opacity-70"}`} onClick={(e) => {e.preventDefault; handleSwap()}}>Swap</a>
            </> :
             <a href="#" className="uppercase tracking-wider font-bold text-xs leading-none" onClick={(e) => {e.preventDefault; enablePairings()}}>Find Pairings</a> 
          }
        </div>
        <div className={`flex flex-col`}>
          <TestSelect fonts={context.alternatives} activeFont={context.primaryFont} sampleText={context.sampleText} chooseFont={choosePrimaryFont} />
          {(context.pairing) && 
            <TestSelect fonts={context.pairings} activeFont={context.secondaryFont} sampleText={context.sampleText} chooseFont={chooseSecondaryFont} />
          }
        </div>
        <div className="">
          <CTA callback={getFonts}>{context.pairing ? "Get These Fonts" : "Get This Font"}</CTA>
        </div>
      </aside>
      <main ref={ref} className="overflow-y-auto flex-1 custom-scrollbar px-4 md:px-0">
        <TestTemplate />
      </main>
    </div>
  );
}

export default Test;