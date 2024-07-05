import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function PairSample({font, activeFont, sampleText, chooseFont}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${0.875 / font.adjust}rem`,
    lineHeight: "1.2"
  }

  const fontSampleStyles = {
    fontSize: `${2.5 / font.adjust}rem`,
    lineHeight: "1.2"
  }

  function handleClick(e) {
    e.preventDefault();
    chooseFont(font);
  }

  return (
    <a href="#" className={`shrink-0 ${font !== activeFont ? "opacity-60" : ""}`} onClick={(e) => handleClick(e)} style={{...wrapperStyles}}>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div className="mb-2 font-semibold" style={{...fontNameStyles}}>{font.label}</div>
      <div style={{...fontSampleStyles}}>{sampleText}</div>
    </a>
  );
}

export default PairSample;