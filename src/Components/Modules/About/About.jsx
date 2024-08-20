import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";
import CTA from "../../Elements/CTA";
import GoogleLogo from "../../../assets/Google.svg";
import AdobeLogo from "../../../assets/Adobe.svg";

function About({font, action, close, sites}) {

  const headingStyles = {
    fontFamily: getFontFamily(font, "rg"),
    fontSize: `${2 / font.adjust}rem`,
    lineHeight: `${2 / font.adjust}rem`
  }

  const sampleStyles = {
    fontFamily: getFontFamily(font, "rg"),
    fontSize: `${1.25 / font.adjust}rem`,
    lineHeight: `${1.25 / font.adjust}rem`
  }

  const tryFont = () => {
    close();
    action(font);
  }

  const handleClose = (e) => {
    e.preventDefault(); 
    close();
  }

  function getFontLabel(weight) {
    switch (weight) {
      case 100:
        return "Thin"
      case 200:
        return "Extra Light"
      case 300:
        return "Light"
      case 400:
        return "Regular"
      case 500:
        return "Medium"
      case 600:
        return "Semibold"
      case 700:
        return "Bold"
      case 800:
        return "Extra Bold"
      case 900:
        return "Black"
      case 1000:
        return "Extra Black"
    }
  }

  function getItalics(weight, weights) {
    if(weights.includes(weight + "i")) {
      return <div className="italic">Italic</div>
    }
  }

  function getWeights() {
    let weights;

    if(font.weight.includes("..")) {

      weights = [];

      const weightRanges = font.weight.split(";");

      weightRanges.forEach((range) => {

        let italics = false;

         if(range.includes("i")) {
          italics = true;
          range = range.slice(0, -1);
        }

        const weightRange = range.split("..");

        for (let weight = parseInt(weightRange[0]); weight <= parseInt(weightRange[1]); weight += 100) {
          if(italics) {
            weights.push(weight + "i");
          } else {
            weights.push(weight.toString());
          }
        }
      });

      weights.sort((a ,b) => { 
        return a - b;
      });

    } else {
      weights = font.weight.split(";");
    }

    return weights.map((weight) => {
      if(!weight.includes("i")) {
        return <li className="flex gap-1 items-start" style={{fontWeight: weight}}><div className="text-xs leading-none pt-px">{weight}</div><div>{getFontLabel(parseInt(weight))}</div>{getItalics(weight, weights)}</li>
      } else {
        return null;
      }
    })
  }

  function getDistribution() {
    switch(font.distribution) {
      case "Google":
        return GoogleLogo;
      case "Adobe":
        return AdobeLogo;
    }
  }
 
  function getDesigners() {
    const designers = font.designer.split(";");
    return designers.join(", ");
  }

  function getInUse() {
    const examples = font.inuse.split(";");
    return examples.map((example) => {
      const urlObj = sites.find((site) => site.website === example);
      const url = urlObj ? urlObj.url : null;
      return (
        <li className="text-sm leading-4 mb-1" key={example}>
          {url ? (
            <a href={`https://www.${url}`} target="_blank" rel="noopener noreferrer">{example}</a>
          ) : (
            example
          )}
        </li>
      )
    })
  }

  return (
    <div className="p-8 flex flex-col h-full">
      <style>
        @import url('{getFontStylesheet(font, ["rg"])}')
      </style>
      <header className="shrink-0 mb-8">
        <div className="flex justify-end mb-8">
          <a href="#" onClick={(e) => handleClose(e)} className="h-4 w-4 flex justify-center items-center">
            <span className="absolute bg-black h-[1.5px] w-3 rotate-45"></span>
            <span className="absolute bg-black h-[1.5px] w-3 -rotate-45"></span>
          </a>
        </div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-semibold stylistic-alternates" style={{...headingStyles}}>{font.label}</h2>
          <CTA callback={tryFont}>Try It Out </CTA>
        </div>
        <div className="flex gap-4 items-center text-sm leading-4 text-gray-800">
          <div className="icon h-9 w-9 flex items-center justify-center rounded-full border border-gray-200">
            <img src={getDistribution()} />
          </div>
          <div>
            {getDesigners()} 
          </div>
          <div>
            {font.Year}
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        <ul style={{...sampleStyles}} className="mb-12 flex flex-wrap gap-4 pt-2">
          {getWeights()}
        </ul>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 text-sm leading-5">
{/*             <p className="mb-8">{font.history}</p>
            {font.usage &&
              <p className="mb-8">{font.usage}</p>
            } */}
            {font.whattheysay && 
              <>
                <h3 className="uppercase font-bold tracking-wider mb-3">What They Say</h3>
                <p className="italic">{font.whattheysay.replace(/<\/?[^>]+(>|$)/g, "")}</p>
              </>
            }
          </div>
          <div>
            {font.inuse && 
              <div className="bg-gray-100/50 p-4 mb-8">
                <h2 className="text-xs leading-none uppercase font-bold tracking-wider mb-2 text-gray-800">{font.label} In Use</h2>
                <ul>
                  {getInUse()}
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;