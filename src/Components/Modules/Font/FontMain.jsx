import { useSwipeable } from "react-swipeable";
import { useContext } from "react";
import { FontContext } from "./Font";
import { AppContext } from "../../../App";
import FontAbout from "./FontAbout";
import FontPairings from "./FontPairings";
import FontAlternatives from "./FontAlternatives";
import FontTest from "./FontTest";

function FontMain() {

  const { setActiveFont } = useContext(AppContext);
  const { activeModule, setActiveModule, modules, positions, setPositions} = useContext(FontContext);

  const index = modules.indexOf(activeModule);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < modules.length - 1) {
        setActiveModule(modules[index + 1]);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        setActiveModule(modules[index -1 ]);
      } else {
        setActiveFont({});
      }
    },
    preventScrollOnSwipe: true
  });


  useEffect(() => {
    const handleScroll = () => {
      setBrowsePosition(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div {...handlers}>
      <div style={{ display: activeModule === "About" ? "block" : "none" }}>
        <FontAbout />
      </div>
      <div style={{ display: activeModule === "Pairings" ? "block" : "none" }}>
        <FontPairings />
      </div>
      <div style={{ display: activeModule === "Test" ? "block" : "none" }}>
        <FontTest />
      </div>
      <div style={{ display: activeModule === "Alternatives" ? "block" : "none" }}>
        <FontAlternatives />
      </div>
    </div>
  )
}

export default FontMain;