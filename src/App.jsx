import { createContext, useState } from "react"
import Browse from "./Components/Modules/Browse/Browse";
import Font from "./Components/Modules/Font/Font";
import "./App.css";
import TestModule from "./Components/Modules/TestModule/TestModule";

export const AppContext = createContext();

function App({data}) {

  // Variables

  const fonts = data.fonts.filter(font => font.status !== "REMOVE");

  const [activeFont, setActiveFont] = useState({});
  const [sampleText, setSampleText] = useState("hamburgers & JACKDAWS");
  const [browsePosition, setBrowsePosition] = useState(0);

  const contextValue = {
    data,
    fonts,
    activeFont,
    setActiveFont,
    sampleText,
    browsePosition,
    setBrowsePosition
  }

  return (
    <AppContext.Provider value={contextValue}>
{/*       {Object.keys(activeFont).length === 0 ?
        <Browse />
          :
        <Font />
      } */}
      <TestModule />
    </AppContext.Provider>
  )
}

export default App
