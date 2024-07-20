import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function ChooseSample({font, sampleText, chooseFont}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${1 / font.adjust}rem`,
    lineHeight: `${1 / font.adjust}rem`
  }

  const fontSampleStyles = {
    fontSize: `${1.5 / font.adjust}rem`,
    lineHeight: `${1.5 / font.adjust}rem`
  }

  function handleClick(e) {
    e.preventDefault();
    chooseFont(font);
  }

  return (
    <a href="#" className="select-none overflow-hidden" onClick={(e) => handleClick(e)} style={{...wrapperStyles}}>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div className="mb-1 opacity-90 whitespace-nowrap flex items-center h-5" style={{...fontNameStyles}}>{font.label}</div>
      <div className="whitespace-nowrap text-black text-gradient pb-1 flex items-center h-8" style={{...fontSampleStyles}}>
        {sampleText}
      </div>
    </a>
  );
}

export default ChooseSample;