import { createContext, useEffect, useState } from "react"
import Choose from "./Components/Modules/Choose/Choose";
import Pair from "./Components/Modules/Pair/Pair";
import Test from "./Components/Modules/Test/Test";
import Modal from "./Components/Modules/Modal/Modal";
import Filters from "./Components/Modules/Filters/Filters";
import findAlternatives from "./utils/findAlternatives";
import findPairings from "./utils/findPairings";
import sortAndFilterFonts from "./utils/sortAndFilterFonts";
import Icon from "./Components/Elements/Icon";
import "./App.css";

export const AppContext = createContext();

function App({data}) {


  // Variables

  const sortOptions = ["Rating", "A-Z"];
  const templates = ["Article", "Landing Page", "Product Page", "Dashboard", "Log In", "Settings"];
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
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState({
    useage: [],
    classification: [],
    subclassification: [],
    vibe: [],
    licence: []
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState(sortOptions[0]);
  const [sortedFonts, setSortedFonts] = useState(sortAndFilterFonts(data.fonts, filter, sort, search));

  useEffect(() => {
    setSortedFonts(sortAndFilterFonts(data.fonts, filter, sort, search));
  }, [filter, sort, search]);

  useEffect(() => {
    if(Object.keys(pairings).length > 0 && Object.keys(secondaryFont).length === 0) {
      setSecondaryFont(pairings[0]);
    }
  }, [pairings]);

  // Navigation

  const [activeModule, setActiveModule] = useState("Choose");
  const [nextModule, setNextModule] = useState(null);
  const [template, setTemplate] = useState(templates[0]);
  const [modal, setModal] = useState({});

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


  // Functions

  const handleChoose = (font) => {
    setPrimaryFont(font);
    setSecondaryFont({});
    setAlternatives(findAlternatives(font, fonts));
    setPairings(findPairings(font, fonts));
    changeModule("Pair");
  }

  const handleSwap = () => {
    const prevPrimary = {...primaryFont};
    const prevSecondary = {...secondaryFont};
    setAlternatives(findAlternatives(prevSecondary, fonts));
    setPairings(findPairings(prevSecondary, fonts, prevPrimary));
    setPrimaryFont(prevSecondary);
    setSecondaryFont(prevPrimary);
  }

  const handlePair = (pair) => {
    setPairing(pair);
    changeModule("Test");
  }

  const changeModule = (module) => {
    setNextModule(module);
  }
  
  const handleBack = () => {
    changeModule(activeModule === "Pair" ? "Choose" : "Pair");
  }

  const handleTemplateSwitch = (e, template) => {
    e.preventDefault();
    setTemplate(template);
  }

  const handleFindAnother = (e) => {
    e.preventDefault();
    changeModule("Choose");
    setModal({});
  }

  const toggleDarkMode = (e) => {
    e.preventDefault();
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
    sampleText
  }

  return (
    <div className="flex flex-col h-screen w-screen relative">
      <header className="w-full max-w-[68rem] px-4 mx-auto my-12 md:my-16 relative">
        <div className="absolute uppercase tracking-wider font-bold text-center leading-5">UX<span className="font-medium">Type</span></div>
        <h1 className="uppercase tracking-wider font-black text-center leading-5">{activeModule}</h1>
      </header>
      <div className="w-full max-w-[68rem] px-4 mx-auto mb-12 md:mb-16">
        {activeModule === "Choose" && 
          <Filters 
            showFilters={showFilters} 
            setShowFilters={setShowFilters} 
            filter={filter}
            setFilter={setFilter} 
            sort={sort}
            setSort={setSort}
            sortOptions={sortOptions}
            search={search}
            setSearch={setSearch}
          />
        }
        {(activeModule === "Pair" || activeModule === "Test") &&
          <div className="flex gap-8">
            <div className="w-60 shrink-0">
              <Icon icon="ArrowLeft" callback={handleBack} label="Back" />
            </div>
            {activeModule === "Test" &&
              <div className="flex justify-between w-full">
                <ul className="flex gap-12 py-2.5">
                  {templates.map((thisTemplate) => (
                    <li key={thisTemplate}><a className={`uppercase tracking-wider font-bold text-sm leading-5 ${template === thisTemplate ? "" : "opacity-60"}`} onClick={(e) => handleTemplateSwitch(e, thisTemplate)} href="#">{thisTemplate}</a></li>
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
                handleSwap={handleSwap} 
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
                handleSwap={handleSwap} 
                setPairing={setPairing}
                setModal={setModal}
                handleFindAnother={handleFindAnother}
              />}
          </div>
        </div>
      </AppContext.Provider>
      <footer className="w-full max-w-[68rem] p-4 mx-auto flex justify-between">
        <ul className="flex gap-4 uppercase font-bold tracking-wider text-xs gray-700">
        {/* <li>About</li>
          <li>Help</li> */}
          <li><a href="#" onClick={toggleDarkMode}>{`${isDarkMode ? "Light" : "Dark"}`} Mode</a></li>
        </ul>
        <div className="text-xs gray-700">© UXType 2024</div>
      </footer>
      <Modal modal={modal} setModal={setModal} data={data} />
    </div>
  )
}

export default App
