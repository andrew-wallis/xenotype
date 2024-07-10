import _ from "lodash";

function findPairings(font, fonts) {

  let matchingFamily = [];
  let matchingPairing = [];
  let matchingOther = [];
  
  let fontList = _.cloneDeep(fonts);
  const thisFont = font;

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

  fontList = fontList.filter(font => font.id !== thisFont.id);

  function sortBySuperclassThenRating(a, b) {
    const indexA = superclassOrder.indexOf(a.superclass);
    const indexB = superclassOrder.indexOf(b.superclass);

    if (indexA !== indexB) {
      return indexA - indexB;
    }

    return b.Rating - a.Rating;
  }

  if(thisFont.family) {
    matchingFamily = fontList.filter(font => font.family === thisFont.family).sort((a, b) => {
      return sortBySuperclassThenRating(a, b);
    });
    fontList = fontList.filter(font => !matchingFamily.includes(font));
  }

  if(thisFont.pairing) {
    const pairings = thisFont.pairing.split(';');

    for(let i = 0; i <= 1; i += 0.06) {
      const thisMatch = fontList.filter(font => {
        return pairings.includes(font.subclass) && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) > i && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) <= (i + 0.06);
      }).sort((a, b) => {
        return sortBySuperclassThenRating(a, b);
      });

      matchingPairing = matchingPairing.concat(thisMatch);
    }

    fontList = fontList.filter(font => !matchingPairing.includes(font));
  }

  superclassOrder.forEach((superclass) => {
    for(let i = 0; i <= 1; i += 0.06) {
      const thisMatch = fontList.filter(font => {
        return font.superclass === superclass && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) > i && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) <= (i + 0.06);
      }).sort((a, b) => {
        return sortBySuperclassThenRating(a, b);
      });

      matchingOther = matchingOther.concat(thisMatch);
    }
  });

  const sortedFonts = [
    ...matchingFamily,
    ...matchingPairing,
    ...matchingOther
  ]

  return sortedFonts;

}

export default findPairings;