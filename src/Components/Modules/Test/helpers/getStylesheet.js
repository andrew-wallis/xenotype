import getFontFamily from "../../../../utils/getFontFamily";


function getStylesheet(primaryFont, secondaryFont) {

  const updateStyles = {
    h1: {
      fontFamily: getFontFamily(primaryFont, "rg"),
      fontSize: `${3 / primaryFont.adjust}rem`,
      lineHeight: 1.2
    },
    h2: {
      fontFamily: getFontFamily(primaryFont, "rg"),
      fontSize: `${2 / primaryFont.adjust}rem`,
      lineHeight: 1.2
    },
    h3: {
      fontFamily: getFontFamily(primaryFont, "rg"),
      fontSize: `${1.5 / primaryFont.adjust}rem`,
      lineHeight: 1.2
    },
    p: {
      fontFamily: getFontFamily(secondaryFont, "rg"),
      fontSize: `${1.125 / secondaryFont.adjust}rem`,
      lineHeight: 1.5
    }
  }

  return updateStyles;

}

export default getStylesheet;