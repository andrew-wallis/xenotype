import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function GetFontsSample({font, sampleText}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${1 / font.adjust}rem`,
    lineHeight: `${1.25 / font.adjust}rem`
  }

  const fontSampleStyles = {
    fontSize: `${1.5 / font.adjust}rem`,
    lineHeight:`${1.5 / font.adjust}rem`
  }

  return (
    <a target="_blank" href={font.link} className={`select-none overflow-hidden shrink-0`}>
      <div style={{...wrapperStyles}}>
        <style>
          @import url('{getFontStylesheet(font, ["rg"])}')
        </style>
        <div className="mb-2 opacity-90 whitespace-nowrap h-5 flex items-center" style={{...fontNameStyles}}>{font.label}</div>
        <div className="whitespace-nowrap text-white dark:text-black pb-1 text-gradient h-6 flex items-center mb-4" style={{...fontSampleStyles}}>{sampleText}</div>
      </div>
      <div className="underline font-medium uppercase tracking-wider text-sm leading-5">Get it from {font.distribution}</div>
    </a>
  );
}

export default GetFontsSample;