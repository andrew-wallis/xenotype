/**
 * Uses an algorithm to find alternatives to the current font
 * Called from BrowseFont
 * @param { object } font 
 * @param { object } fonts 
 * @returns { object } Array of alternative fonts
 */

function findAlternatives(font, fonts) {

  let matchingSubclass = [];
  let matchingClass = [];

  let fontList = fonts;

  const thisFont = font;

  fontList = fontList.filter(font => font.id !== thisFont.id);

  fontList = fontList.filter(font => font.superclass == thisFont.superclass);

  if(thisFont.subclass) {
    const subclass = thisFont.subclass;
    matchingSubclass = fontList.filter(font => {
      return subclass.includes(font.subclass);
    });

    matchingSubclass.forEach((font) => {
      font.score = 0;

      font.score += parseInt(font.Rating);

      if(Math.abs(thisFont.character - font.character) <= 2) {
        font.score += 25;
      }
  
      if(thisFont.Vibe ===font.Vibe) {
        font.score += 25;
      }
    });

    matchingSubclass.sort((a ,b) => { 
      return b.score - a.score;
    });

    fontList = fontList.filter(font => !matchingSubclass.includes(font));
  }

  if(thisFont.classification) {
    const thisClass = thisFont.classification;
    matchingClass = fontList.filter(font => {
      return thisClass.includes(font.classification);
    });

    matchingClass.forEach((font) => {
      font.score = 0;

      font.score += parseInt(font.Rating);

      if(Math.abs(thisFont.character - font.character) <= 2) {
        font.score += 25;
      }
  
      if(thisFont.Vibe ===font.Vibe) {
        font.score += 25;
      }
    });

    matchingClass.sort((a ,b) => { 
      return b.score - a.score;
    });
    
    fontList = fontList.filter(font => !matchingClass.includes(font));
  }

  const sortedFonts = [
    ...matchingSubclass,
    ...matchingClass
  ]

  return sortedFonts;

}

export default findAlternatives;