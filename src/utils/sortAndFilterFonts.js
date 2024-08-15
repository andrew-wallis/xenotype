function sortAndFilterFonts(fonts, filter, sort, search) {

  delete fonts.columns;

  if(search) {
    fonts = fonts.filter(font => font.name.includes(search));
  }
  
  if(filter.classification.length > 0) {
    fonts = fonts.filter(font => filter.classification.includes(font.superclass));
  }

  if(filter.subclassification.length > 0) {
    fonts = fonts.filter(font => filter.subclassification.includes(font.classification));
  }

  if(filter.vibe.length > 0) {
    fonts = fonts.filter(font => filter.vibe.includes(font.Vibe));
  }

  if(filter.licence.length > 0) {
    fonts = fonts.filter(font => filter.licence.includes(font.distribution));
  }
 
  let sortedFonts = [...fonts];

  if(sort === "Rating") {
    sortedFonts = sortedFonts.sort((a, b) => b.Rating - a.Rating);
  } else if(sort === "A-Z") {
    sortedFonts = sortedFonts.sort((a, b) => a.label.localeCompare(b.label));
  }

  return sortedFonts;

}

export default sortAndFilterFonts;