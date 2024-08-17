import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";
import GoogleLogo from "../../../assets/Google.svg";
import AdobeLogo from "../../../assets/Adobe.svg";

function GetFontsSample({font, sampleText}) {

  const wrapperStyles = {
    fontFamily: getFontFamily(font, "rg"),
    fontSize: `${1.5 / font.adjust}rem`,
    lineHeight: `${1.5 / font.adjust}rem`
  }

  function getDistribution() {
    switch(font.distribution) {
      case "Google":
        return GoogleLogo;
      case "Adobe":
        return AdobeLogo;
    }
  }

  return (
    <a target="_blank" href={font.link} className={`select-none`}>
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <div className="font-semibold mb-6" style={{...wrapperStyles}}>
        {font.label}
      </div>
      <div className="flex gap-4 items-center text-sm leading-4 text-gray-800">
        <div className="icon h-9 w-9 flex items-center justify-center rounded-full border border-gray-200">
          <img src={getDistribution()} />
        </div>
        <div className="">
          Get it from {font.distribution}
        </div>
      </div>
    </a>
  );
}

export default GetFontsSample;