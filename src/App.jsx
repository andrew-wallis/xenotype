import { useState } from "react"
import Choose from "./Components/Modules/Choose/Choose";
import Pair from "./Components/Modules/Pair/Pair";
import Test from "./Components/Modules/Test/Test";

function App({data}) {

  const [activePrimaryFont, setActivePrimaryFont] = useState(data.fonts[42]);
  const [activeSecondaryFont, setActiveSecondaryFont] = useState({});
  const [activeModule, setActiveModule] = useState("Pair");
  const [sampleText, setSampleText] = useState("handgloves & AETHERS");

  console.log(activePrimaryFont);
  console.log(activeSecondaryFont);

  return (
    <div className="max-w-[68rem] mx-auto">
      {activeModule === "Choose" &&
        <Choose 
          fonts={data.fonts} 
          sampleText={sampleText} 
          setActiveModule={setActiveModule} 
          setActivePrimaryFont={setActivePrimaryFont} 
        />
      }
      {activeModule === "Pair" && 
        <Pair 
          fonts={data.fonts}
          activePrimaryFont={activePrimaryFont}
          setActivePrimaryFont={setActivePrimaryFont}
          activeSecondaryFont={activeSecondaryFont}
          setActiveSecondaryFont={setActiveSecondaryFont}
          sampleText={sampleText} 
          setActiveModule={setActiveModule}
        />
      }
      {activeModule === "Test" && 
        <Test 
          fonts={data.fonts}
          activePrimaryFont={activePrimaryFont}
          setActivePrimaryFont={setActivePrimaryFont}
          activeSecondaryFont={activeSecondaryFont}
          setActiveSecondaryFont={setActiveSecondaryFont}
          setActiveModule={setActiveModule}
        />
      }
    </div>
  )
}

export default App
