function sortAndFilterFonts(fonts, filter, sort, search) {

  delete fonts.columns;

  if(search) {
    fonts = fonts.filter(font => font.name.toLowerCase().includes(search.toLowerCase()));
  }

  if(filter.useage.length > 0) {
    fonts = fonts.filter(font => {

      return filter.useage.some(usage => {
        switch(usage) {
          case "Workhorse":
            if(parseInt(font.Utility) === 10 && parseInt(font["Weight Boost"]) > 4) {
              return true;
            }
          break;
          case "Titles":
            return font.titles === "Y";
          case "Labels":
            return font.labels === "Y";
          case "Accents":
            return font.accents === "Y";
          case "Short Text":
            return font.short === "Y";
          case "Long Text":
            return font.long === "Y";
        }
      });
    });
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