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
    }).sort((a, b) => b.Rating - a.Rating);
    fontList = fontList.filter(font => !matchingSubclass.includes(font));
  }

  if(thisFont.classification) {
    const thisClass = thisFont.classification;
    matchingClass = fontList.filter(font => {
      return thisClass.includes(font.classification);
    }).sort((a, b) => b.Rating - a.Rating);
    fontList = fontList.filter(font => !matchingClass.includes(font));
  }

  const sortedFonts = [
    ...[thisFont],
    ...matchingSubclass,
    ...matchingClass
  ]

  return sortedFonts;

}

export default findAlternatives;