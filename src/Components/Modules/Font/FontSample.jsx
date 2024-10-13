import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

function FontSample({font, activeFont, chooseFont}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
  }

  const fontNameStyles = {
    fontSize: `${1 / font.adjust}rem`,
    lineHeight: `${1 / font.adjust}rem`
  }

  const handleClick = (e) => {
    e.preventDefault();
    chooseFont(font);
  }

  return (
    <a href="#" className={`block select-none overflow-hidden shrink-0 ${font !== activeFont ? "opacity-60" : "cursor-grab"}`} onClick={handleClick} style={{...wrapperStyles}}>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div className="font-semibold opacity-90 whitespace-nowrap h-5 flex items-center" style={{...fontNameStyles}}>{font.label}</div>
    </a>
  );
}

export default FontSample;