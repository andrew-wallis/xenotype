import { useContext, useRef } from "react";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";
import SampleLink from "../../Elements/SampleLink";

function FontHeader({}) {

  const context = useContext(AppContext);
  const contextFont = useContext(FontContext);

  const font = context.activeFont;

  const activeFontRef = useRef(null);

  const headingStyles = {
    fontFamily: getFontFamily(font, "rg"),
    fontSize: `${1.75 / font.adjust}rem`,
  }


  // Functions

  const resetPairing = () => {
    contextFont.setPairing({});
  }

  const resetAlternative = () => {
    contextFont.setAlternative({});
  }

  const backButton = () => {
    context.setActiveFont({});
  }


  return (
    <>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div className="grid grid-cols-4 gap-2 pb-4">
        <div className="text-sm leading-4">
          <a href="#" onClick={(e) => backButton()}>All Fonts</a>
        </div>
        <h1 className="col-span-2 text-center uppercase tracking-wider font-semibold text-sm leading-4">
          {contextFont.activeModule}
        </h1>
      </div>
      {(contextFont.activeModule === "About") ?
        <div className="leading-[52px] font-semibold" style={{...headingStyles}}>
          {font.label}
        </div> 
        : (contextFont.activeModule === "Pairings") ?
          <SampleLink 
            font={font}
            sampleText={context.sampleText} 
            action={resetPairing}
            inactive={(Object.keys(contextFont.pairing).length > 0 && contextFont.pairing !== font ? true : false)}
            ref={activeFontRef}
          />
        : (contextFont.activeModule === "Alternatives") ?
          <SampleLink 
            font={font}
            sampleText={context.sampleText} 
            action={resetAlternative}
            inactive={(Object.keys(contextFont.alternative).length > 0 && contextFont.alternative !== font ? true : false)}
            ref={activeFontRef}
          />
        : (contextFont.activeModule === "Test") ?
          <></> : <></>
      }
    </>
  );
}

export default FontHeader;