import FontAbout from "./FontAbout";
import FontPairings from "./FontPairings";
import FontAlternatives from "./FontAlternatives";
import FontTest from "./FontTest";

function FontMain({activeModule}) {

  switch(activeModule) {
    case "About":
      return <FontAbout />
    case "Pairings":
      return <FontPairings />
    case "Alternatives":
      return <FontAlternatives />
    case "Test":
      return <FontTest />
  }
}

export default FontMain;