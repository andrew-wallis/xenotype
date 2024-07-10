function sortAndFilterFonts(fonts, filter, sort) {
  delete fonts.columns;

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
 
  let sortFonts = Object.entries(fonts);

  if(sort === "Rating") {
    sortFonts = sortFonts.sort((a, b) => b[1].Rating - a[1].Rating);
  } else if(sort === "A-Z") {
    sortFonts = sortFonts.sort((a, b) => b[1].Label - a[1].Label);
  }

  return sortFonts;

}

export default sortAndFilterFonts;