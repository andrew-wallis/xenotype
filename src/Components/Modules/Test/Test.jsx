import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import TestSample from "./TestSample";
import Button from "../../Elements/Button";
import Article from "./templates/Article";

function Test() {

  // React Hooks

  const context = useContext(AppContext);

  const [alternatives, setAlternatives] = useState([]);
  const [pairings, setPairings] = useState([]);

  useEffect(() => {
    const index = context.allAlternatives.indexOf(context.primaryFont);
    setAlternatives(context.allAlternatives.slice(0, index + 6));
  }, [context.allAlternatives]);

  useEffect(() => {
    const index = context.allPairings.indexOf(context.secondaryFont);
    setPairings(context.allPairings.slice(0, index + 6));
  }, [context.allPairings]);
  
  const alternativesRef = useRef(null);
  const pairingsRef = useRef(null);


  // Functions

  const choosePrimaryFont = (font) => {
    if(font !== context.primaryFont) {
      context.setPrimaryFont(font);
    } else {
      context.setChosenFont(font);
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== context.secondaryFont) {
      context.setSecondaryFont(font);
    } else {
      context.setChosenFont(font);
      setDefaultPairing();
    }
  }

  const setDefaultPairing = () => {
    context.setSecondaryFont(context.allPairings[0]);
  }

  const handleAlternativesScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = alternativesRef.current;
    console.log(scrollTop, scrollHeight, clientHeight);
    if(scrollTop + clientHeight >= scrollHeight - 5) {
      const newItems = context.allAlternatives.slice(alternatives.length, alternatives.length + 4);
      setAlternatives((prevItems) => [...prevItems, ...newItems] );
    }
  }

  const handlePairingsScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = pairingsRef.current;
    if(scrollTop + clientHeight >= scrollHeight -5) {
      const newItems = context.allPairings.slice(pairings.length, pairings.length + 4);
      setPairings((prevItems) => [...prevItems, ...newItems]);
    }
  }

  return (
    <div className="">
      <div className="max-w-[68rem] mx-auto">
        <div className="flex">
          <aside className="w-64 mr-16">
            <div className="mb-12 overflow-y-auto h-32" ref={alternativesRef} onScroll={handleAlternativesScroll}>
              {alternatives.map((font, index) => (
                <TestSample key={index} font={font} activeFont={context.primaryFont} sampleText={context.sampleText} chooseFont={choosePrimaryFont} />
              ))}
            </div>
            <div className="mb-12 overflow-y-auto h-32" ref={pairingsRef} onScroll={handlePairingsScroll}>
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