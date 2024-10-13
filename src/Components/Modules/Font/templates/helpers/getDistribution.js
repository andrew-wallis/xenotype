import GoogleLogo from "../../../../../assets/Google.svg";
import AdobeLogo from "../../../../../assets/Adobe.svg";

function getDistribution(font) {
  switch(font.distribution) {
    case "Google":
      return GoogleLogo;
    case "Adobe":
      return AdobeLogo;
  }
}

export default getDistribution;