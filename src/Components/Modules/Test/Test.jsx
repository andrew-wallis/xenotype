import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import TestTemplate from "./TestTemplate";
import TestSelect from "./TestSelect";
import ArrowIcon from "../../Elements/Icons/ArrowIcon";
import Icon from "../../Elements/Icon";

function Test({setPrimaryFont, setSecondaryFont, alternatives, pairings, handleSwap, setModal, template, setPairing, handleFindAnother}) {

  // React Hooks

  const [swap, setSwap] = useState(false);
  const context = useContext(AppContext);
  const ref = useRef(null);

  useEffect(() => {
    if(ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [template]);

  // Functions

  const choosePrimaryFont = (font) => {
    if(font !== context.primaryFont) {
      setPrimaryFont(font);
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== context.secondaryFont) {
      setSecondaryFont(font);
    }
  }

  const handlePairing = () => {
    if(context.pairing) {
      setPairing(false);
    } else {
      setPairing(true);
    }
  }

  const getFonts = (e) => {
    e.preventDefault();
    setModal({
      type: "GetFonts",
      action: handleFindAnother,
      content: {
        primaryFont: context.primaryFont,
        secondaryFont: context.pairing ? context.secondaryFont : null,
        sampleText: context.sampleText,
      }
    })
  }

  const handleSwapButton = () => {
    handleSwap();
    setSwap(!swap);
  }

  return (
    <div className="w-full flex overflow-hidden max-w-[68rem] sm:px-4 mx-auto relative">
      <aside className="hidden md:block w-56 mr-6 pr-4">
        <div className={`flex flex-col`}>
          <TestSelect fonts={alternatives} activeFont={context.primaryFont} sampleText={context.sampleText} chooseFont={choosePrimaryFont} swap={swap} />
          <div className="flex gap-1 mt-5 mb-8">
            {context.pairing ? 
              <>
                <Icon icon="Pair" label="Don't Pair" callback={handlePairing} />
                <Icon icon="Swap" label="Swap" callback={handleSwapButton} rotate={swap} />
              </>
              :
                <Icon icon="Unpair" label="Pair" callback={handlePairing} />
            }
          </div>
          <div className="relative">
            <TestSelect fonts={pairings} activeFont={context.secondaryFont} sampleText={context.sampleText} chooseFont={chooseSecondaryFont} swap={swap} />
            {(!context.pairing) && <div className="absolute inset-0 bg-white opacity-80"></div>}
          </div>
        </div>
      </aside>
      <main ref={ref} className="overflow-y-auto flex-1 custom-scrollbar px-4 md:px-0">
        <TestTemplate template={template} />
      </main>
      <div className="absolute bottom-12 left-4">
        <a onClick={getFonts} className="inline-block relative rounded-full py-3 pl-6 pr-[14px] bg-gray-900 text-gray-100 dark:bg-gray-900 uppercase tracking-wider text-sm leading-6 font-bold flex gap-[5px]" href="#">
        {context.pairing ? "Get These Fonts" : "Get This Font"}
          <div className="w-[14px] text-gray-300 dark:text-gray-700 flex items-center">
            <ArrowIcon direction="Right" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Test;