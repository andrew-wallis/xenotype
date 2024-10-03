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
    modules,
    activeModule,
    setActiveModule
  }

  return (
    <FontContext.Provider value={fontContext}>
      <div className="flex w-full h-full flex-col overflow-hidden relative">
        <header className="shrink-0 py-4 px-4">
          <FontHeader />
        </header>
        <main className="grow overflow-y-auto overflow-x-hidden px-4 pb-12 custom-scrollbar">
          <FontMain activeModule={activeModule} />
        </main>
        <nav className="sticky bottom-0 grid grid-cols-4 px-4 gap-4 justify-between">
          <FontNav />
        </nav>
      </div>
    </FontContext.Provider>
  );
}

export default Font;