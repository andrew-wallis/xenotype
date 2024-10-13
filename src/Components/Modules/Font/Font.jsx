import { createContext, useContext, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../../../App";
import findPairings from "../../../utils/findPairings";
import findAlternatives from "../../../utils/findAlternatives";
import FontNav from "./FontNav";
import FontAbout from "./screens/FontAbout";
import FontHeader from "./FontHeader";

export const FontContext = createContext();

function Font() {


  // React Context

  const {activeFont, setActiveFont, fonts} = useContext(AppContext);


  // Variables

  const templates = ["Article", "Landing Page", "Product Page", "Dashboard", "Log In", "Settings"];


  // React Hooks
  const [pairings, setPairings] = useState(findPairings(activeFont, fonts));
  const [pairing, setPairing] = useState({});
  const [alternatives, setAlternatives] = useState(findAlternatives(activeFont, fonts));
  const [alternative, setAlternative] = useState({});
  const [swap, setSwap] = useState(false);
  const [template, setTemplate] = useState(templates[0]);
  

/*   // React Swipeable

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
  }); */


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
    swap, 
    setSwap
  }

  return (
    <FontContext.Provider value={fontContext}>
      <div className="relative">
        <FontHeader />
        <main className="px-4 pb-4">
          <FontAbout />
        </main>
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