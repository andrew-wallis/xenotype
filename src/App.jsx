import { useEffect, useRef, useState } from "react"
import Choose from "./Components/Modules/Choose/Choose";
import Pair from "./Components/Modules/Pair/Pair";
import Test from "./Components/Modules/Test/Test";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Button from "./Components/Elements/Button";
import Select from "./Components/Elements/Select";
import BackLink from "./Components/Elements/BackLink";

function App({data}) {


  // Variables

  const sortOptions = ["Rating", "A-Z"];


  // React Hooks

  const [activePrimaryFont, setActivePrimaryFont] = useState({});
  const [activeSecondaryFont, setActiveSecondaryFont] = useState({});
  const [sampleText, setSampleText] = useState("hamburgers & JACKDAWS");

  const [activeModule, setActiveModule] = useState("Choose");
  const [nextModule, setNextModule] = useState(null);
  const [direction, setDirection] = useState("forward");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const chooseRef = useRef(null);
  const pairRef = useRef(null);
  const testRef = useRef(null);

  useEffect(() => {
    if(nextModule !== null) {
      setActiveModule(nextModule);
      setNextModule(null);
    }
  }, [nextModule]);

  useEffect(() => {
    if(isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    })
  }


  // Functions

  const changeModule = (module) => {

    if((activeModule === "Choose") || (activeModule === "Pair" && module === "Test")) {
      setDirection("forward");
    } else if((activeModule === "Pair" && module === "Test") || (activeModule === "Test")) {
      setDirection("backward");
    }

    setNextModule(module);
  }

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  }
  
  const handleBack = () => {
    changeModule(activeModule === "Pair" ? "Choose" : "Pair");
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="w-full max-w-[68rem] mx-auto my-16 relative">
        <div className="absolute uppercase tracking-wider font-bold text-center leading-5">UX<span className="font-medium">Type</span></div>
        <h1 className="uppercase tracking-wider font-black text-center leading-5">{activeModule}</h1>
        <button onClick={toggleDarkMode} className="absolute top-0 right-0 uppercase tracking-wider font-medium text-sm leading-5">{isDarkMode ? "Light" : "Dark"}</button>
      </header>
      <div className="w-full max-w-[68rem] mx-auto mb-16">
        {activeModule === "Choose" && 
          <div className="flex justify-between">
            <Button callback={handleToggleFilters}>
              Filters
            </Button>
            <Select label="Filter" id="filter" value={sort} callback={setSort} options={sortOptions} />
          </div>
        }
        {(activeModule === "Pair" || activeModule === "Test") &&
          <BackLink callback={handleBack} />
        }
      </div>
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
                showFilters={showFilters}
                sort={sort}
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
