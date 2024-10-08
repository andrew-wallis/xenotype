import { createContext, useContext, useState } from "react";
import { AppContext } from "../../../App";
import findPairings from "../../../utils/findPairings";
import findAlternatives from "../../../utils/findAlternatives";
import FontMain from "./FontMain";
import FontNav from "./FontNav";
import FontHeader from "./FontHeader";

export const FontContext = createContext();

function Font() {


  // React Context

  const context = useContext(AppContext);


  // Variables

  const font = context.activeFont;
  const fonts = context.fonts;
  const templates = ["Article", "Landing Page", "Product Page", "Dashboard", "Log In", "Settings"];
  const modules = ["About", "Pairings", "Alternatives", "Test"];


  // React Hooks
  const [pairings, setPairings] = useState(findPairings(font, fonts));
  const [pairing, setPairing] = useState({});
  const [alternatives, setAlternatives] = useState(findAlternatives(font, fonts));
  const [alternative, setAlternative] = useState({});
  const [template, setTemplate] = useState(templates[0]);
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [positions, setPositions] = useState({
    "About": 0,
    "Pairings": 0,
    "Alternatives": 0,
    "Test": 0
  });


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
    templates,
    template,
    setTemplate,
    modules,
    activeModule,
    setActiveModule,
    positions,
    setPositions
  }

  return (
    <FontContext.Provider value={fontContext}>
      <div className="relative">
        <header className="p-4">
          <FontHeader />
        </header>
        <main className="px-4 pb-4">
          <FontMain activeModule={activeModule} />
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