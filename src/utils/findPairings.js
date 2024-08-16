import _ from "lodash";

function findPairings(font, fonts, initialFont) {
  
  let matchingInitial = [];
  let matchingFamily = [];
  let matchingPairing = [];
  let matchingOther = [];
  
  let fontList = _.cloneDeep(fonts);
  const thisFont = font;
  
  fontList = fontList.filter(font => font.id !== thisFont.id);

  if(initialFont) {
    matchingInitial.push(initialFont);
    fontList = fontList.filter(font => font.id !== initialFont.id);
  }

  if(thisFont.family) {
    matchingFamily = fontList.filter(font => font.family === thisFont.family).sort((a, b) => {
      return b.Rating - a.Rating;
    });
    fontList = fontList.filter(font => !matchingFamily.includes(font));
  }

  if(thisFont.pairing) {
    const pairings = thisFont.pairing.split(';');

    for(let i = 0; i <= 1; i += 0.06) {
      const thisMatch = fontList.filter(font => {
        return pairings.includes(font.subclass) && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) > i && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) <= (i + 0.06);
      });

      thisMatch.forEach((font) => {
        font.score = 0;

        font.score += parseInt(font.Rating);
  
        if(thisFont.character > font.character) {
          font.score += 25;
        }
    
        if(thisFont.Vibe ===font.Vibe) {
          font.score += 25;
        }
      });

      thisMatch.sort((a ,b) => { 
        return b.score - a.score;
      });

      matchingPairing = matchingPairing.concat(thisMatch);
    }

    fontList = fontList.filter(font => !matchingPairing.includes(font));
  }

  for(let i = 0; i <= 1; i += 0.06) {
    const thisMatch = fontList.filter(font => {
      return font.subclass !== thisFont.subclass && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) > i && Math.abs(parseFloat(font.xheight) - parseFloat(thisFont.xheight)) <= (i + 0.06);
    });

    thisMatch.forEach((font) => {
      font.score = 0;

      font.score += parseInt(font.Rating);

      if(thisFont.character > font.character) {
        font.score += 25;
      }
  
      if(thisFont.Vibe ===font.Vibe) {
        font.score += 25;
      }
    });

    thisMatch.sort((a ,b) => { 
      return b.score - a.score;
    });

    matchingOther = matchingOther.concat(thisMatch);
  }

  const sortedFonts = [
    ...matchingInitial,
    ...matchingFamily,
    ...matchingPairing,
    ...matchingOther
  ]

  return sortedFonts;

}

export default findPairings;