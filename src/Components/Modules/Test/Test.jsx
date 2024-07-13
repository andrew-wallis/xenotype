import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import TestSample from "./TestSample";
import Button from "../../Elements/Button";
import Article from "./templates/Article";

function Test() {

  // React Hooks

  const context = useContext(AppContext);

  const [alternativesIndex, setAlternativesIndex] = useState(0);
  const [pairingsIndex, setPairingsIndex] = useState(0);

  const [alternatives, setAlternatives] = useState([]);
  const [pairings, setPairings] = useState([]);

  console.log(alternativesIndex, pairingsIndex);

  useEffect(() => {
    setAlternativesIndex(context.allAlternatives.indexOf(context.primaryFont));
    console.log(alternativesIndex);
    setAlternatives(context.allAlternatives.slice(alternativesIndex > 4 ? alternativesIndex : 0, alternativesIndex + 4));
  }, [context.allAlternatives]);

  useEffect(() => {
    setPairingsIndex(context.allPairings.indexOf(context.secondaryFont));
    console.log(pairingsIndex);
    setPairings(context.allPairings.slice(pairingsIndex > 4 ? pairingsIndex : 0, pairingsIndex + 4));
  }, [context.allPairings]);

  const choosePrimaryFont = (font) => {
    if(font !== context.primaryFont) {
      context.setPrimaryFont(font);
      setAlternativesIndex(alternatives.indexOf(font));
    } else {
      context.setChosenFont(font);
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== context.secondaryFont) {
      context.setSecondaryFont(font);
      setPairingsIndex(pairings.indexOf(font));
    } else {
      context.setChosenFont(font);
      setDefaultPairing();
    }
  }

  const setDefaultPairing = () => {
    context.setSecondaryFont(context.allPairings[0]);
  }

  return (
    <div className="">
      <div className="max-w-[68rem] mx-auto">
        <div className="flex">
          <aside className="w-64 mr-16">
            <div className="mb-12">
              {alternatives.map((font, index) => (
                <TestSample key={index} font={font} activeFont={context.primaryFont} sampleText={context.sampleText} chooseFont={choosePrimaryFont} />
              ))}
            </div>
            <div className="mb-12">
              {(context.primaryFont !== context.secondaryFont) && pairings.map((font, index) => (
                <TestSample key={index} font={font} activeFont={context.secondaryFont} sampleText={context.sampleText} chooseFont={chooseSecondaryFont} />
              ))}
              {(context.primaryFont === context.secondaryFont) &&
                <Button callback={setDefaultPairing}>Find Pairings</Button>
              }
            </div>
          </aside>
          <main className="flex-1">
            <Article />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Test;