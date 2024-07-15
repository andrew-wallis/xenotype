import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function TestSample({font, activeFont, chooseFont}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${1 / font.adjust}rem`,
    lineHeight: "1.2rem"
  }

  function handleClick(e) {
    e.preventDefault();
    chooseFont(font);
  }

  return (
    <>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}');
      </style>
      <a href="#" className={`block mb-3 font-semibold ${font !== activeFont ? "opacity-60" : ""}`} onClick={(e) => handleClick(e)} style={{...wrapperStyles}}>
      <div style={{...fontNameStyles}}>{font.label}</div>
    </a>
    </>

  );
}

export default TestSample;