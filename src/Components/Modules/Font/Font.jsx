import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import FontMain from "./FontMain";
import FontNav from "./FontNav";
import FontHeader from "./FontHeader";
import findPairings from "../../../utils/findPairings";
import findAlternatives from "../../../utils/findAlternatives";

export const FontContext = createContext();

function Font() {


  // React Context

  const {activeFont, fonts} = useContext(AppContext);


  // Variables

  const templates = ["Article", "Landing Page", "Product Page", "Dashboard", "Log In", "Settings"];
  const modules = ["About", "Pairings", "Test", "Alternatives"];


  // React Hooks

  const [pairings, setPairings] = useState(findPairings(activeFont, fonts));
  const [pairing, setPairing] = useState({});
  const [alternatives, setAlternatives] = useState(findAlternatives(activeFont, fonts));
  const [alternative, setAlternative] = useState({});
  const [template, setTemplate] = useState(templates[0]);
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [swap, setSwap] = useState(false);

  const [scrollPositions, setScrollPositions] = useState({
    About: 0,
    Pairings: 0,
    Test: 0,
    Alternatives: 0
  });

  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = scrollPositions[activeModule];
    }
  }, [activeModule, scrollPositions]);

  useEffect(() => {
    setAlternatives(findAlternatives(activeFont, fonts));
    setPairings(findPairings(activeFont, fonts));
    setPairing({});
    setAlternative({});

    setScrollPositions({
      About: 0,
      Pairings: 0,
      Test: 0,
      Alternatives: 0
    });
  }, [activeFont]);

  useEffect(() => {
    setScrollPositions((prevPositions) => ({
      ...prevPositions,
      ["Test"]: 0,
    }));
  }, [pairing, alternative]);


  // Functions

  const handleScroll = (e) => {
    setScrollPositions((prevPositions) => ({
      ...prevPositions,
      [activeModule]: mainRef.current.scrollTop,
    }));
  };


  // Context Variable

  const fontContext = {
    pairings,
    setPairings,
    pairing,
    setPairing,
    alternatives,
    setAlternatives,
    alternative,
    setAlternative,
    template,
    setTemplate,
    templates,
    modules,
    activeModule,
    setActiveModule,
    swap,
    setSwap
  }

  return (
    <FontContext.Provider value={fontContext}>
      <div className="flex flex-col h-full overflow-hidden touch-none">
        <header className="shrink-0 p-4 touch-auto">
          <FontHeader />
        </header>
        <main 
          className="px-4 pb-12 grow overflow-y-auto custom-scrollbar touch-auto"
          onScroll={(e) => {handleScroll(e)}}
          ref={mainRef}
        >
          <FontMain />
        </main>
        <nav className="shrink-0 grid grid-cols-4 justify-between p-4 gap-4 bg-white touch-auto">
          <FontNav />
        </nav>
      </div>
    </FontContext.Provider>
  );
}

export default Font;