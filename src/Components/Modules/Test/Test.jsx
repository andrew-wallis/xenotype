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
  const [alternativesScroll, setAlternativesScroll] = useState(true);
  const [pairingsScroll, setPairingsScroll] = useState(true);

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

  useEffect(() => {
    if (alternatives.length > 0 && alternativesScroll) {
      const index = alternatives.findIndex(font => font === context.primaryFont);
      if (index >= 0 && alternativesRef.current) {
        const { clientHeight } = alternativesRef.current;
        const targetPosition = index * 33.5;
        if(targetPosition > (clientHeight)) {
          alternativesRef.current.scrollTo(0, targetPosition - 21);
        }
      }
      setAlternativesScroll(false);
    }
  }, [alternatives]);

  useEffect(() => {
    if (pairings.length > 0 && pairingsScroll) {
      const index = pairings.findIndex(font => font === context.secondaryFont);
      if (index >= 0 && pairingsRef.current) {
        const { clientHeight } = pairingsRef.current;
        const targetPosition = index * 33.5;
        if(targetPosition > (clientHeight)) {
          pairingsRef.current.scrollTo(0, targetPosition - 21);
        }
      }
      setPairingsScroll(false);
    }
  }, [pairings]);


  // Functions

  const choosePrimaryFont = (font) => {
    if(font !== context.primaryFont) {
      context.setPrimaryFont(font);
    } else {
      chooseFont(font);
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== context.secondaryFont) {
      context.setSecondaryFont(font);
    } else {
      chooseFont(font);
    }
  }

  const chooseFont = (font) => {
    context.setChosenFont(font);
    alternativesRef.current.scrollTo(0, 0);
    pairingsRef.current.scrollTo(0, 0);
  }

  const enablePairings = () => {
    context.setPairing(true);
  }

  const disablePairing = () => {
    context.setPairing(false);
  }

  const handleAlternativesScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = alternativesRef.current;
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
    <div className="w-full flex overflow-hidden max-w-[68rem] px-4 mx-auto">
      <aside className="w-64 mr-4">
        <div className="mb-12 overflow-y-auto h-32 custom-scrollbar" ref={alternativesRef} onScroll={handleAlternativesScroll}>
          {alternatives.map((font, index) => (
            <TestSample key={index} font={font} activeFont={context.primaryFont} sampleText={context.sampleText} chooseFont={choosePrimaryFont} />
          ))}
        </div>
        {(context.pairing) && 
          <>
            <div className="mb-12 overflow-y-auto h-32 custom-scrollbar" ref={pairingsRef} onScroll={handlePairingsScroll}>
              {pairings.map((font, index) => (
                <TestSample key={index} font={font} activeFont={context.secondaryFont} sampleText={context.sampleText} chooseFont={chooseSecondaryFont} />
              ))}
            </div>
            <div className="flex justify-center">
              <a href="#" className="underline font-medium uppercase tracking-wider text-sm leading-5" onClick={disablePairing}>Skip Pairing</a>
            </div>
          </>
        }
        {(!context.pairing) &&
          <div className="flex justify-center">
            <Button callback={enablePairings}>Find Pairings</Button>
          </div>
        }
      </aside>
      <main className="overflow-y-auto flex-1 custom-scrollbar">
        <Article />
      </main>
    </div>
  );
}

export default Test;