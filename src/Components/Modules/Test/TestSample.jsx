import { forwardRef } from "react";
import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

const TestSample = forwardRef(({font, activeFont, chooseFont}, ref) => {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${1 / font.adjust}rem`,
    lineHeight: `${1 / font.adjust}rem`
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
      <a ref={ref} href="#" className={`block mb-3 font-semibold ${font !== activeFont ? "opacity-60" : ""} h-5 flex items-center`} onClick={(e) => handleClick(e)} style={{...wrapperStyles}}>
      <div style={{...fontNameStyles}}>{font.label}</div>
    </a>
    </>

  );
});

export default TestSample;