import getFontFamily from "../../utils/getFontFamily";
import getFontStylesheet from "../../utils/getFontStylesheet";

function Sample({font, sampleText}) {

  const fontNameStyles = {
    fontFamily: getFontFamily(font, "rg"),
    fontSize: `${1 / font.adjust}rem`,
    lineHeight: `${1 / font.adjust}rem`
  }

  const fontSampleStyles = {
    fontFamily: getFontFamily(font, "rg"),
    fontSize: `${1.5 / font.adjust}rem`,
    lineHeight: `${1.5 / font.adjust}rem`
  }

  return (
    <>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div className="mb-1 opacity-90 whitespace-nowrap flex items-center h-5" style={{...fontNameStyles}}>{font.label}</div>
      <div className="whitespace-nowrap text-black text-gradient pb-1 flex items-center h-8" style={{...fontSampleStyles}}>
        {sampleText}
      </div>
    </>
  );
}

export default Sample;