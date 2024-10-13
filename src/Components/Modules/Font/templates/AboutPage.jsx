import { useContext } from "react";
import { AppContext } from "../../../../App";
import { FontContext } from "../Font";
import getFontFamily from "../../../../utils/getFontFamily";
import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getDistribution from "./helpers/getDistribution";
import getDesigners from "./helpers/getDesigners";
import FontWeights from "../screens/components/FontWeights";
import FontInUse from "../screens/components/FontInUse";

function AboutPage({}) {

  const {data} = useContext(AppContext);
  const {primaryFont, secondaryFont, swap} = useContext(FontContext);
  
  const sites = data.sites;

  let thisFont = primaryFont;
  let pairingFont = Object.keys(secondaryFont).length > 0 ? secondaryFont : primaryFont;

  if(swap) {
    let swapThisFont = {...thisFont};
    thisFont = pairingFont;
    pairingFont = swapThisFont;
  }

  const title = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${2.25 / thisFont.adjust}rem`,
    lineHeight: "2.25rem"
  }

  const heading = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1 / pairingFont.adjust}rem`,
    lineHeight: "1.5rem"
  }

  const subheading = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1 / pairingFont.adjust}rem`,
    lineHeight: "1.5rem"
  }

  const lede = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1.125 / pairingFont.adjust}rem`,
    lineHeight: "1.7rem"
  }

  const paragraph = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1 / pairingFont.adjust}rem`,
    lineHeight: "1.5rem"
  }

  const small = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.875 / pairingFont.adjust}rem`,
    lineHeight: "1rem"
  }

  const sampleStyles = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${1.25 / thisFont.adjust}rem`,
    lineHeight: `${1.25 / thisFont.adjust}rem`
  }
 
  return (
    <>
      <style>
        @import url('{getFontStylesheet(thisFont, ["rg"])}');
        @import url('{getFontStylesheet(pairingFont, ["rg"])}');
      </style>
      <h1 style={{ ...title}} className="mb-8 font-semibold">{thisFont.label}</h1>
      <div style={{...small}} className="mb-4 flex gap-4 items-center text-sm leading-6 text-gray-800 font-semibold">
        <div className="icon h-9 w-9 flex items-center justify-center rounded-full border border-gray-200">
          <img src={getDistribution(thisFont)} />
        </div>
        <div>
          {getDesigners(thisFont)} 
        </div>
        <div>
          {thisFont.Year}
        </div>
      </div>
      <div className="mb-4">
        {thisFont.usage &&
          <p style={{...paragraph}} className="mb-4">{thisFont.usage}</p>
        }
        {thisFont.whattheysay && 
          <>
            <h2 className="uppercase tracking-wider font-semibold" style={{...heading}}>What They Say</h2>
            <p style={{...paragraph}}>{thisFont.whattheysay.replace(/<\/?[^>]+(>|$)/g, "")}</p>
          </>
        }
      </div>
      {thisFont.inuse &&
        <div className="mb-4">
          <div className="bg-gray-100/50 p-4">
            <h2 className="uppercase tracking-wider font-semibold" style={{...heading}}>{thisFont.label} In Use</h2>
            <ul style={{...paragraph}}>
              <FontInUse font={thisFont} sites={sites} />
            </ul>
          </div>
        </div>
      }
    </>
  );
}

export default AboutPage;