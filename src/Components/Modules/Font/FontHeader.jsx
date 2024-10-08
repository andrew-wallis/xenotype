import { useContext, useRef } from "react";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import SampleLink from "../../Elements/SampleLink";
import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";
import SelectComponent from "../../Elements/SelectComponent";

function FontHeader({}) {

  const {activeFont, setActiveFont, sampleText} = useContext(AppContext);
  const {alternative, setPairing, setAlternative, activeModule, templates, template, setTemplate, swap, setSwap, pairing} = useContext(FontContext);

  const activeFontRef = useRef(null);

  const headingStyles = {
    fontFamily: getFontFamily(activeFont, "rg"),
    fontSize: `${1.75 / activeFont.adjust}rem`,
  }


  // Functions

  const resetPairing = () => {
    setPairing({});
  }

  const resetAlternative = () => {
    setAlternative({});
  }

  const backButton = () => {
    setActiveFont({});
  }

  return (
    <>
      <style>
        @import url('{getFontStylesheet(activeFont, ["rg"])}')
      </style>
      <div className="grid grid-cols-4 gap-2 pb-4">
        <div className="text-sm leading-4">
          <a href="#" onClick={(e) => backButton()}>All Fonts</a>
        </div>
        <h1 className="col-span-2 text-center uppercase tracking-wider font-semibold text-sm leading-4">
          {activeModule}
        </h1>
      </div>
      {(activeModule === "About") ?
        <div className="leading-[52px] font-semibold" style={{...headingStyles}}>
          {activeFont.label}
        </div> 
        : (activeModule === "Pairings") ?
          <SampleLink 
            font={activeFont}
            sampleText={sampleText} 
            action={resetPairing}
            ref={activeFontRef}
          />
        : (activeModule === "Alternatives") ?
          <SampleLink 
            font={activeFont}
            sampleText={sampleText} 
            action={resetAlternative}
            inactive={(Object.keys(alternative).length > 0 && alternative !== activeFont ? true : false)}
            ref={activeFontRef}
          />
        : (activeModule === "Test") ?
            <div className="flex">
              <div className={`grow border-gray-100 border ${Object.keys(pairing).length > 0 ? "rounded-l-lg" : "rounded-lg"} `}>
                <SelectComponent id="template-select" label="Select template" options={templates} action={setTemplate} value={template} />
              </div>
              {Object.keys(pairing).length > 0 ? 
                <div className="shrink-0">
                  <button onClick={(e) => {e.preventDefault; setSwap(!swap)}} className="block py-3 px-4 border-gray-100 bg-gray-100 border rounded-r-lg leading-6 h-12">Swap</button>
                </div>
              : <></>}
            </div>
        : <></>
      }
    </>
  );
}

export default FontHeader;