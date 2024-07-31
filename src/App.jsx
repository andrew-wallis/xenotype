import { createContext, useEffect, useRef, useState } from "react"
import Choose from "./Components/Modules/Choose/Choose";
import Pair from "./Components/Modules/Pair/Pair";
import Test from "./Components/Modules/Test/Test";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Button from "./Components/Elements/Button";
import Select from "./Components/Elements/Select";
import BackLink from "./Components/Elements/BackLink";
import findAlternatives from "./utils/findAlternatives";
import findPairings from "./utils/findPairings";
import About from "./Components/Modules/About/About";

export const AppContext = createContext();

function App({data}) {


  // Variables

  const sortOptions = ["Rating", "A-Z"];
  const templates = ["Article", "Landing Page", "Product Page", "Dashboard", "Log In"];
  const fonts = data.fonts.filter(font => font.status !== "REMOVE");


  // React Hooks

  // Fonts and lists

  const [chosenFont, setChosenFont] = useState({});
  const [primaryFont, setPrimaryFont] = useState({});
  const [secondaryFont, setSecondaryFont] = useState({});
  const [aboutFont, setAboutFont] = useState({});

  const [allAlternatives, setAllAlternatives] = useState([]);
  const [allPairings, setAllPairings] = useState([]);
  const [sampleText, setSampleText] = useState("hamburgers & JACKDAWS");
  const [pairing, setPairing] = useState(true);
  const [swap, setSwap] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(Object.keys(chosenFont).length > 0) {
      setAllAlternatives(findAlternatives(chosenFont, fonts));
      setAllPairings(findPairings(chosenFont, fonts));
      setPrimaryFont(chosenFont);
    }
  }, [chosenFont]);

  useEffect(() => {
    setSecondaryFont(allPairings[0]);
  }, [allPairings]);


  // Navigation

  const [activeModule, setActiveModule] = useState("Choose");
  const [nextModule, setNextModule] = useState(null);
  const [direction, setDirection] = useState("forward");
  const [template, setTemplate] = useState(templates[0]);

  const chooseRef = useRef(null);
  const pairRef = useRef(null);
  const testRef = useRef(null);

  useEffect(() => {
    if(nextModule !== null) {
      setActiveModule(nextModule);
      setNextModule(null);
    }
  }, [nextModule]);


  // Sort and filters

  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]);


  // Dark mode

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if(isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);


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

  const handleSwap = () => {
    setSwap(!swap);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    })
  }

  const closeModal = () => {
    setAboutFont({});
    setShowModal(false);
  }

  const contextValue = {
    fonts,
    chosenFont,
    setChosenFont,
    primaryFont,
    setPrimaryFont,
    secondaryFont,
    setSecondaryFont,
    allAlternatives,
    allPairings,
    pairing,
    setPairing,
    sampleText,
    changeModule,
    template,
    swap,
    setSwap,
    aboutFont,
    setAboutFont
  }

  return (
    <div className="flex flex-col h-screen w-screen relative">
      <header className="w-full max-w-[68rem] px-4 mx-auto my-12 md:my-16 relative">
        <div className="absolute uppercase tracking-wider font-bold text-center leading-5">UX<span className="font-medium">Type</span></div>
        <h1 className="uppercase tracking-wider font-black text-center leading-5">{activeModule}</h1>
        <button onClick={toggleDarkMode} className="absolute top-0 right-4 uppercase tracking-wider font-medium text-sm leading-5 select-none">{isDarkMode ? "Light" : "Dark"}</button>
      </header>
      <div className="w-full max-w-[68rem] px-4 mx-auto mb-12 md:mb-16">
        {activeModule === "Choose" && 
          <div className="flex justify-between">
            <Button callback={handleToggleFilters} active={showFilters}>
              Filters
            </Button>
            <Select label="Filter" id="filter" value={sort} callback={setSort} options={sortOptions} />
          </div>
        }
        {(activeModule === "Pair" || activeModule === "Test") &&
          <div className="flex">
            <div className="w-48 mr-6 pr-4">
              <BackLink callback={handleBack} />
            </div>
            {activeModule === "Test" &&
              <div className="flex justify-between w-full">
                <ul className="flex gap-12 py-2.5">
                  {templates.map((thisTemplate) => (
                    <li><a className={`uppercase tracking-wider font-bold text-sm leading-5 ${template === thisTemplate ? "" : "opacity-60"}`} onClick={(e) => {e.preventDefault; setTemplate(thisTemplate)}} href="#">{thisTemplate}</a></li>
                  ))}
                </ul>
                <div className="shrink-0">
                  <Button callback={handleSwap} active={swap}>Swap Fonts</Button>
                </div>
              </div>

            }
          </div>
        }
      </div>
      <AppContext.Provider value={contextValue}>
        <TransitionGroup className="flex-1 overflow-hidden relative">
          <CSSTransition 
            key={activeModule}
            timeout={300}
            classNames={`slide-${direction}`}
            nodeRef={
              activeModule === "Choose" ? chooseRef : activeModule === "Pair" ? pairRef : testRef
            }
          >
            <div className="absolute inset-0 overflow-hidden flex flex-col" ref={
              activeModule === "Choose" ? chooseRef : activeModule === "Pair" ? pairRef : testRef
            }>
              {activeModule === "Choose" && <Choose showFilters={showFilters} sort={sort} setAboutFont={setAboutFont} setShowModal={setShowModal}/>}
              {activeModule === "Pair" && <Pair />}
              {activeModule === "Test" && <Test />}
            </div>
          </CSSTransition>
        </TransitionGroup>
        <>
          <div className={`fixed inset-0 z-20 flex items-center justify-center py-16 transform transition-all duration-300 ${showModal ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
            <div className="h-full bg-white  max-w-3xl mx-auto">
              {Object.keys(aboutFont).length > 0 && <About font={aboutFont} closeModal={closeModal} sites={data.sites} />}
            </div>
          </div>
          <div className={`fixed inset-0 z-10 bg-black transition-opacity duration-300 ${showModal ? "opacity-50 translate-y-0" : "opacity-0 -translate-y-full"}`}>
          </div>
        </>
      </AppContext.Provider>
    </div>
  )
}

export default App
