import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function TestSample({font, activeFont, sampleText, chooseFont}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${1 / font.adjust}rem`,
    lineHeight: "1.2"
  }

  function handleClick(e) {
    e.preventDefault();
    chooseFont(font);
  }

  return (
    <a href="#" className={`block mb-3 font-semibold ${font !== activeFont ? "opacity-60" : ""}`} onClick={(e) => handleClick(e)} style={{...wrapperStyles}}>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div style={{...fontNameStyles}}>{font.label}</div>
    </a>
  );
}

export default TestSample;