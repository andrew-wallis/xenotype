import { useEffect, useRef, useState } from "react"
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
  const [nextModule, setNextModule] = useState(null);
  const [direction, setDirection] = useState("forward");

  const chooseRef = useRef(null);
  const pairRef = useRef(null);
  const testRef = useRef(null);

  const changeModule = (module) => {

    if(activeModule === "Choose") {
      setDirection("forward");
    } else if(activeModule === "Pair") {
      if(module === "Test") {
        setDirection("forward")
      } else {
        setDirection("backward")
      }
    } else if(activeModule === "Test") {
      setDirection("backward");
    }

    setNextModule(module);
  }

  useEffect(() => {
    if(nextModule !== null) {
      setActiveModule(nextModule);
      setNextModule(null);
    }
  }, [nextModule]);

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full max-w-[68rem] mx-auto my-16 relative">
        <div className="absolute uppercase tracking-wider font-bold text-center leading-5">UX<span className="font-medium">Type</span></div>
        <h1 className="uppercase tracking-wider font-black text-center leading-5">{activeModule}</h1>
        <div className="absolute right-0">
          <a href="#" onClick={(e) => {e.preventDefault(); setDirection(direction === "forward" ? "backward" : "forward") }}>Switch Direction</a>
        </div>
      </header>
      <TransitionGroup className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <CSSTransition 
          key={activeModule}
          timeout={300}
          classNames={`slide-${direction}`}
          nodeRef={
            activeModule === "Choose" ? chooseRef : activeModule === "Pair" ? pairRef : testRef
          }
        >
          <div className="absolute inset-0" ref={
            activeModule === "Choose" ? chooseRef : activeModule === "Pair" ? pairRef : testRef
          }>
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
