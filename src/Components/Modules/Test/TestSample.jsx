import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function TestSample({font, activeFont, sampleText, chooseFont}) {

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
    <a href="#" className={`${font !== activeFont ? "opacity-60" : ""}`} onClick={(e) => handleClick(e)} style={{...wrapperStyles}}>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div style={{...fontNameStyles}}>{font.label}</div>
    </a>
  );
}

export default TestSample;