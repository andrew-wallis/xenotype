import { createContext, useContext, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../../../App";
import findPairings from "../../../utils/findPairings";
import findAlternatives from "../../../utils/findAlternatives";
import FontNav from "./FontNav";
import FontAbout from "./FontAbout";
import FontPairings from "./FontPairings";
import FontTest from "./FontTest";
import FontAlternatives from "./FontAlternatives";

export const FontContext = createContext();

function Font() {


  // React Context

  const {activeFont, setActiveFont, fonts} = useContext(AppContext);


  // Variables

  const templates = ["Article", "Landing Page", "Product Page", "Dashboard", "Log In", "Settings"];
  const modules = ["About", "Pairings", "Test", "Alternatives"];


  // React Hooks
  const [pairings, setPairings] = useState(findPairings(activeFont, fonts));
  const [pairing, setPairing] = useState({});
  const [alternatives, setAlternatives] = useState(findAlternatives(activeFont, fonts));
  const [alternative, setAlternative] = useState({});
  const [swap, setSwap] = useState(false);
  const [template, setTemplate] = useState(templates[0]);
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [positions, setPositions] = useState({
    "About": 0,
    "Pairings": 0,
    "Alternatives": 0,
    "Test": 0
  });

  useEffect(() => {
    const handleScroll = () => {
      setPositions((prevPositions) => ({
        ...prevPositions,
        [activeModule]: window.scrollY
      }));
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [activeModule]);

  useEffect(() => {
    window.scrollTo(0, positions[activeModule]);
  }, [activeModule]);

  useEffect(() => {
    setAlternatives(findAlternatives(activeFont, fonts));
    setPairings(findPairings(activeFont, fonts));
    setPairing({});
    setAlternative({});

    setPositions({
      About: 0,
      Pairings: 0,
      Test: 0,
      Alternatives: 0
    });
  }, [activeFont]);

  useEffect(() => {
    setPositions((prevPositions) => ({
      ...prevPositions,
      ["Test"]: 0,
    }));
  }, [pairing, alternative]);
  

  // React Swipeable

  const index = modules.indexOf(activeModule);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < modules.length - 1) {
        setActiveModule(modules[index + 1]);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        setActiveModule(modules[index -1 ]);
      } else {
        setActiveFont({});
      }
    },
    preventScrollOnSwipe: true
  });


  // Context Variable

  const fontContext = {
    pairings,
    pairing,
    setPairing,
    alternatives,
    alternative,
    setAlternative,
    templates,
    template,
    setTemplate,
    modules,
    activeModule,
    setActiveModule,
    swap, 
    setSwap
  }

  return (
    <FontContext.Provider value={fontContext}>
      <div className="relative">
        <div {...handlers}>
          <div style={{ display: activeModule === "About" ? "block" : "none" }}>
            <FontAbout />
          </div>
          <div style={{ display: activeModule === "Pairings" ? "block" : "none" }}>
            <FontPairings />
          </div>
          <div style={{ display: activeModule === "Test" ? "block" : "none" }}>
            <FontTest />
          </div>
          <div style={{ display: activeModule === "Alternatives" ? "block" : "none" }}>
            <FontAlternatives />
          </div>
        </div>
        <nav className="sticky mx-8 nav-position">
          <div className="bg-white grid grid-cols-4 justify-between p-4 gap-4 rounded-full">
            <FontNav />
          </div>
        </nav>
      </div>
    </FontContext.Provider>
  );
}

export default Font;