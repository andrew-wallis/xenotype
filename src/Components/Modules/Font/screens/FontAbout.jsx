import { useContext } from "react";
import { AppContext } from "../../../../App";
import getFontFamily from "../../../../utils/getFontFamily";
import FontHeader from "../FontHeader";
import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getDistribution from "./helpers/getDistribution";
import getDesigners from "./helpers/getDesigners";
import FontWeights from "./components/FontWeights";
import FontInUse from "./components/FontInUse";

function FontAbout({}) {

  const {activeFont, data} = useContext(AppContext);
  
  const font = activeFont;
  const sites = data.sites;

  const sampleStyles = {
    fontFamily: getFontFamily(font, "rg"),
    fontSize: `${1.25 / font.adjust}rem`,
    lineHeight: `${1.25 / font.adjust}rem`
  }

  const headingStyles = {
    fontFamily: getFontFamily(activeFont, "rg"),
    fontSize: `${1.75 / activeFont.adjust}rem`,
  }
 
  return (
    <>
      <FontHeader>
        <style>
          @import url('{getFontStylesheet(activeFont, ["rg"])}')
        </style>
        <div className="leading-[52px] font-semibold" style={{...headingStyles}}>
          {activeFont.label}
        </div> 
      </FontHeader>
      <main className="px-4 pb-4">
        <div className="mb-4 flex gap-4 items-center text-sm leading-6 text-gray-800 font-semibold">
          <div className="icon h-9 w-9 flex items-center justify-center rounded-full border border-gray-200">
            <img src={getDistribution(font)} />
          </div>
          <div>
            {getDesigners(font)} 
          </div>
          <div>
            {font.Year}
          </div>
        </div>
        <ul style={{...sampleStyles}} className="mb-4 flex flex-wrap gap-4 pt-2">
          <FontWeights font={font} />
        </ul>
        <div className="mb-4">
          {font.usage &&
            <p className="mb-4">{font.usage}</p>
          }
          {font.whattheysay && 
            <>
              <h3 className="uppercase font-bold tracking-wider mb-2 leading-5">What They Say</h3>
              <p className="italic">{font.whattheysay.replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </>
          }
        </div>
        {font.inuse &&
          <div className="mb-4">
            <div className="bg-gray-100/50 p-4">
              <h2 className="text-xs leading-none uppercase font-bold tracking-wider mb-2 text-gray-800">{font.label} In Use</h2>
              <ul>
                <FontInUse font={font} sites={sites} />
              </ul>
            </div>
          </div>
        }
      </main>
    </>
  );
}

export default FontAbout;