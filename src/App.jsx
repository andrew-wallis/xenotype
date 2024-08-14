import { createContext, useEffect, useRef, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Choose from "./Components/Modules/Choose/Choose";
import Pair from "./Components/Modules/Pair/Pair";
import Test from "./Components/Modules/Test/Test";
import Modal from "./Components/Modules/Modal/Modal";
import BackLink from "./Components/Elements/BackLink";
import findAlternatives from "./utils/findAlternatives";
import findPairings from "./utils/findPairings";
import sortAndFilterFonts from "./utils/sortAndFilterFonts";
import "./App.css";
import Icon from "./Components/Elements/Icon";
import ChooseFilters from "./Components/Modules/Filters/ChooseFilters";

export const AppContext = createContext();

function App({data}) {


  // Variables

  const sortOptions = ["Rating", "A-Z"];
  const templates = ["Article", "Landing Page", "Product Page", "Dashboard", "Log In"];
  const fonts = data.fonts.filter(font => font.status !== "REMOVE");
  const defaultFont = data.fonts.find(font => font.name === "Inter");

  // React Hooks

  // Fonts and lists

  const [primaryFont, setPrimaryFont] = useState(defaultFont);
  const [secondaryFont, setSecondaryFont] = useState({});
  const [alternatives, setAlternatives] = useState([]);
  const [pairings, setPairings] = useState([]);
  const [sampleText, setSampleText] = useState("hamburgers & JACKDAWS");
  const [pairing, setPairing] = useState(true);
  const [swap, setSwap] = useState(false);

  const [filter, setFilter] = useState({
    classification: [],
    subclassification: [],
    vibe: [],
    licence: []
  });

  const [pairFilter, setPairFilter] = useState({
    classification: [],
    subclassification: [],
    vibe: [],
    licence: []
  });

  const [showFilters, setShowFilters] = useState(true);
  const [sort, setSort] = useState(sortOptions[0]);
  const [sortedFonts, setSortedFonts] = useState(sortAndFilterFonts(data.fonts, filter, sort));

  useEffect(() => {
    setSortedFonts(sortAndFilterFonts(data.fonts, filter, sort));
  }, [filter, sort]);

  useEffect(() => {
    if(Object.keys(pairings).length > 0) {
      setSecondaryFont(pairings[0]);
    }
  }, [pairings]);

  // Navigation

  const [activeModule, setActiveModule] = useState("Choose");
  const [nextModule, setNextModule] = useState(null);
  const [direction, setDirection] = useState("forward");
  const [template, setTemplate] = useState(templates[0]);
  const [modal, setModal] = useState({});

  const chooseRef = useRef(null);
  const pairRef = useRef(null);
  const testRef = useRef(null);

  useEffect(() => {
    if(nextModule !== null) {
      setActiveModule(nextModule);
      setNextModule(null);
    }
  }, [nextModule]);


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


  // Function

  const handleChoose = (font) => {
    setPrimaryFont(font);
    setAlternatives(findAlternatives(font, fonts));
    setPairings(findPairings(font, fonts));
    changeModule("Pair");
  }

  const handlePair = (pair) => {
    setPairing(pair);
    changeModule("Test");
  }

  const changeModule = (module) => {
    if((activeModule === "Choose") || (activeModule === "Pair" && module === "Test")) {
      setDirection("forward");
    } else if((activeModule === "Pair" && module === "Test") || (activeModule === "Test")) {
      setDirection("backward");
    }
    setNextModule(module);
  }
  
  const handleBack = () => {
    changeModule(activeModule === "Pair" ? "Choose" : "Pair");
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    })
  }

  const contextValue = {
    primaryFont,
    setPrimaryFont,
    secondaryFont,
    setSecondaryFont,
    pairing,
    sampleText,
    swap
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
          <ChooseFilters 
            showFilters={showFilters} 
            setShowFilters={setShowFilters} 
            filter={filter}
            setFilter={setFilter} 
            sort={sort}
            setSort={setSort}
            sortOptions={sortOptions}
          />
        }
        {(activeModule === "Pair" || activeModule === "Test") &&
          <div className="flex">
            <div className="w-48 mr-6 pr-4">
              <Icon icon="ArrowLeft" callback={handleBack} />
            </div>
            {activeModule === "Test" &&
              <div className="flex justify-between w-full">
                <ul className="flex gap-12 py-2.5">
                  {templates.map((thisTemplate) => (
                    <li key={thisTemplate}><a className={`uppercase tracking-wider font-bold text-sm leading-5 ${template === thisTemplate ? "" : "opacity-60"}`} onClick={(e) => {e.preventDefault; setTemplate(thisTemplate)}} href="#">{thisTemplate}</a></li>
                  ))}
                </ul>
              </div>
            }
          </div>
        }
      </div>
      <AppContext.Provider value={contextValue}>
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-hidden flex flex-col">
            {activeModule === "Choose" && 
              <Choose 
                sortedFonts={sortedFonts} 
                filter={filter} 
                setFilter={setFilter} 
                showFilters={showFilters} 
                setModal={setModal} 
                handleChoose={handleChoose}
              />
            }
            {activeModule === "Pair" && 
              <Pair
                setPrimaryFont={setPrimaryFont} 
                setSecondaryFont={setSecondaryFont} 
                alternatives={alternatives} 
                pairings={pairings}
                handlePair={handlePair}
              />
            }
            {activeModule === "Test" && 
              <Test 
                setPrimaryFont={setPrimaryFont} 
                setSecondaryFont={setSecondaryFont} 
                alternatives={alternatives} 
                pairings={pairings}
                template={template}
                setSwap={setSwap} 
                setPairing={setPairing}
                setModal={setModal}
              />}
          </div>
        </div>
      </AppContext.Provider>
      
{/*       <AppContext.Provider value={contextValue}>
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
              {activeModule === "Choose" && 
                <Choose 
                  sortedFonts={sortedFonts} 
                  filter={filter} 
                  setFilter={setFilter} 
                  showFilters={showFilters} 
                  setModal={setModal} 
                  handleChoose={handleChoose}
                />
              }
              {activeModule === "Pair" && 
                <Pair
                  setPrimaryFont={setPrimaryFont} 
                  setSecondaryFont={setSecondaryFont} 
                  alternatives={alternatives} 
                  pairings={pairings}
                  handlePair={handlePair}
                />
              }
              {activeModule === "Test" && 
                <Test 
                  setPrimaryFont={setPrimaryFont} 
                  setSecondaryFont={setSecondaryFont} 
                  alternatives={alternatives} 
                  pairings={pairings}
                  template={template}
                  setSwap={setSwap} 
                  setPairing={setPairing}
                  setModal={setModal}
                />}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </AppContext.Provider> */}
      <Modal modal={modal} setModal={setModal} data={data} />
    </div>
  )
}

export default App
