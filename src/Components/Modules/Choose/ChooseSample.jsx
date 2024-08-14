import { forwardRef } from "react";
import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";

const ChooseSample = forwardRef(({font, sampleText, chooseFont, setModal}, ref) => {

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

  function getWeights() {
    if(font.weight.includes("..")) {
      return "Variable Weights • "
    } else {
      let count = 0;
      const weightArray = font.weight.split(";");
      weightArray.forEach((weight) => {
        if(!weight.includes("i")) {
          count++;
        }
      });
      return `${count} Weight${count !== 1 ? "s" : ""} • `;
    }
  }

  function getItalics() {
    if(font.weight.includes("..")) {
      return "Italics • "
    } else {
      let count = 0;
      const weightArray = font.weight.split(";");
      weightArray.forEach((weight) => {
        if(weight.includes("i")) {
          count++;
        }
      });
      return count ? `${count} Italic${count !== 1 ? "s" : ""} • ` : "";
    }
  }

  function showAbout(e) {
    e.preventDefault();
    setModal({
      type: "About",
      content: font,
      action: chooseFont
    })
  }

  return (
    <div className="relative font-sample relative">
      <a ref={ref} href="#" className="select-none overflow-hidden" onClick={(e) => handleClick(e)} style={{...wrapperStyles}}>
        <style>
          @import url('{getFontStylesheet(font, ["rg"])}')
        </style>
        <div className="mb-1 opacity-90 whitespace-nowrap flex items-center h-5" style={{...fontNameStyles}}>{font.label}</div>
        <div className="whitespace-nowrap text-black text-gradient pb-1 flex items-center h-8" style={{...fontSampleStyles}}>
          {sampleText}
        </div>
      </a>
      <a className="flex gap-[2px] py-2" onClick={(e) => showAbout(e)} href="#">
        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
      </a>
    </div>
  );
});

export default ChooseSample;