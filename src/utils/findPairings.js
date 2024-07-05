/**
 * Uses an algorithm to find pairings to the current font
 * Called from BrowseFont
 * @param { object } font 
 * @param { object } data 
 * @returns { object } Array of suggested fonts
 */

function findPairings(font, fonts) {

  let matchingFamily = [];
  let matchingPairing = [];

  let fontList = fonts;
  const thisFont = font;

  // Remove this font from array
  fontList = fontList.filter(font => font.id !== thisFont.id);

  // Extract matching family
  if(thisFont.family) {
    matchingFamily = fontList.filter(font => font.family === thisFont.family);
    fontList = fontList.filter(font => !matchingFamily.includes(font));
  }

  let superclassOrder = []; 
  
  switch(thisFont.superclass) {
    case "Sans":
      superclassOrder = ["Serif", "Slab", "Mono", "Sans"];
      break;
    case "Serif":
      superclassOrder = ["Sans", "Mono", "Slab", "Serif"];
      break;
    case "Slab":
      superclassOrder = ["Sans", "Mono", "Serif", "Slab"];
      break;
    case "Mono":
      superclassOrder = ["Sans", "Serif", "Slab", "Mono"];
      break;
  }

  const superclassIndex = {};
  superclassOrder.forEach((superclass, index) => {
    superclassIndex[superclass] = index;
  });

  if(thisFont.pairing) {
    const pairings = thisFont.pairing.split(';');

    matchingPairing = fontList.filter(font => {
      return pairings.includes(font.subclass) && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) <= 0.06;
    }).sort((a, b) => {
      const indexA = superclassIndex[a.superclass];
      const indexB = superclassIndex[b.superclass];
  
      if (indexA !== indexB) {
          return indexA - indexB;
      }
  
      return b.Rating - a.Rating;
    });

  } else {

    matchingPairing = fontList.filter(font => {
      return Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) <= 0.06;
    }).sort((a, b) => {
      const indexA = superclassIndex[a.superclass];
      const indexB = superclassIndex[b.superclass];
  
      if (indexA !== indexB) {
          return indexA - indexB;
      }
  
      return b.Rating - a.Rating;
    });

  }

  const sortedFonts = [
    ...matchingFamily,
    ...matchingPairing
  ]

  return sortedFonts;

}

export default findPairings;