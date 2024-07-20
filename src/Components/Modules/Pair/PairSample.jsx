import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function PairSample({font, activeFont, sampleText, chooseFont}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${0.875 / font.adjust}rem`,
    lineHeight: `${0.875 / font.adjust}rem`
  }

  const fontSampleStyles = {
    fontSize: `${2 / font.adjust}rem`,
    lineHeight:`${2 / font.adjust}rem`
  }

  function handleClick(e) {
    e.preventDefault();
    chooseFont(font);
  }

  return (
    <a href="#" className={`select-none overflow-hidden shrink-0 ${font !== activeFont ? "opacity-60" : ""}`} onClick={(e) => handleClick(e)} style={{...wrapperStyles}}>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div className="mb-2 opacity-90 whitespace-nowrap h-5 flex items-center" style={{...fontNameStyles}}>{font.label}</div>
      <div className="whitespace-nowrap text-white dark:text-black pb-1 text-gradient h-10 flex items-center" style={{...fontSampleStyles}}>{sampleText}</div>
    </a>
  );
}

export default PairSample;