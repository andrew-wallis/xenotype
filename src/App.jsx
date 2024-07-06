import { useState } from "react"
import Choose from "./Components/Modules/Choose/Choose";
import Pair from "./Components/Modules/Pair/Pair";
import Test from "./Components/Modules/Test/Test";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

function App({data}) {

  const [activePrimaryFont, setActivePrimaryFont] = useState({});
  const [activeSecondaryFont, setActiveSecondaryFont] = useState({});
  const [sampleText, setSampleText] = useState("handgloves & AETHERS");

  const [activeModule, setActiveModule] = useState("Choose");
  const [direction, setDirection] = useState("forward");

  const changeModule = (module) => {
    if((activeModule === "Choose" && module === "Pair") || (activeModule === "Pair" && module === "Test")) {
      setDirection("forward");
    } else {
      setDirection("backward");
    }
    setActiveModule(module);
  }

  return (
    <div>
      <TransitionGroup>
        <CSSTransition 
          key={activeModule}
          timeout={300}
          classNames={`slide-${direction}`}
        >
          <div>
            {activeModule === "Choose" &&
              <Choose 
                fonts={data.fonts} 
                sampleText={sampleText}
                changeModule={changeModule}
                setActivePrimaryFont={setActivePrimaryFont} 
                setActiveSecondaryFont={setActiveSecondaryFont}
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
                changeModule={changeModule}
              />
            }
            {activeModule === "Test" && 
              <Test 
                fonts={data.fonts}
                activePrimaryFont={activePrimaryFont}
                setActivePrimaryFont={setActivePrimaryFont}
                activeSecondaryFont={activeSecondaryFont}
                setActiveSecondaryFont={setActiveSecondaryFont}
                changeModule={changeModule}
              />
            }
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default App
