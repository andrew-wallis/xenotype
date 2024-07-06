import getFontFamily from "../../../../utils/getFontFamily";


function getStylesheet(pairingPrimaryFont, pairingSecondaryFont) {

  const updateStyles = {
    h1: {
      fontFamily: getFontFamily(pairingPrimaryFont, "rg"),
      fontSize: `${3 / pairingPrimaryFont.adjust}rem`,
      lineHeight: 1.2
    },
    h2: {
      fontFamily: getFontFamily(pairingPrimaryFont, "rg"),
      fontSize: `${2 / pairingPrimaryFont.adjust}rem`,
      lineHeight: 1.2
    },
    h3: {
      fontFamily: getFontFamily(pairingPrimaryFont, "rg"),
      fontSize: `${1.5 / pairingPrimaryFont.adjust}rem`,
      lineHeight: 1.2
    },
    p: {
      fontFamily: getFontFamily(pairingSecondaryFont, "rg"),
      fontSize: `${1.125 / pairingSecondaryFont.adjust}rem`,
      lineHeight: 1.5
    }
  }

  return updateStyles;

}

export default getStylesheet;