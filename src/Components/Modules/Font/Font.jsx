import { createContext, useContext, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../../../App";
import findPairings from "../../../utils/findPairings";
import findAlternatives from "../../../utils/findAlternatives";
import FontNav from "./FontNav";
import AboutPage from "./templates/AboutPage";
import FontHeader from "./FontHeader";
import ArticlePage from "./templates/ArticlePage";

export const FontContext = createContext();

function Font() {


  // React Context

  const {activeFont, setActiveFont, fonts} = useContext(AppContext);


  // Variables

  const templates = ["Article", "Landing Page", "Product Page", "Dashboard", "Log In", "Settings"];


  // React Hooks
  const [pairings, setPairings] = useState(findPairings(activeFont, fonts));
  const [alternatives, setAlternatives] = useState(findAlternatives(activeFont, fonts));
  const [swap, setSwap] = useState(false);
  const [template, setTemplate] = useState(templates[0]);

  const [primaryFont, setPrimaryFont] = useState(activeFont);
  const [secondaryFont, setSecondaryFont] = useState({});
  

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
    alternatives,
    templates,
    template,
    setTemplate,
    swap, 
    setSwap,
    primaryFont,
    setPrimaryFont,
    secondaryFont,
    setSecondaryFont
  }

  return (
    <FontContext.Provider value={fontContext}>
      <div className="relative">
        <FontHeader />
        <main className="p-4">
          <ArticlePage />
        </main>
        <FontNav />
      </div>
    </FontContext.Provider>
  );
}

export default Font;