function sortAndFilterFonts(fonts, filter, sort) {
  delete fonts.columns;

  if(filter.classification.length > 0) {
    fonts = fonts.filter(font => filter.classification.includes(font.superclass));
  }

  let sortFonts = Object.entries(fonts);

  if(sort === "Rating") {
    sortFonts = sortFonts.sort((a, b) => b[1].Rating - a[1].Rating);
  } else if(sort === "Alphabetical") {
    sortFonts = sortFonts.sort((a, b) => b[1].Label - a[1].Label);
  }

  return sortFonts;

}

export default sortAndFilterFonts;