import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function PairSample({font, activeFont, sampleText, chooseFont}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${0.875 / font.adjust}rem`,
    lineHeight: "1rem"
  }

  const fontSampleStyles = {
    fontSize: `${2 / font.adjust}rem`,
    lineHeight: "2.4rem"
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
      <div className="mb-2 opacity-90 whitespace-nowrap" style={{...fontNameStyles}}>{font.label}</div>
      <div className="whitespace-nowrap text-white dark:text-black text-gradient" style={{...fontSampleStyles}}>{sampleText}</div>
    </a>
  );
}

export default PairSample;