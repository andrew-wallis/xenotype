function updateFilters(filter, term, key) {

  const updatefilter = {...filter};

  if(!updatefilter[key].includes(term)) {
    updatefilter[key].push(term);
  } else {
    const filterIndex = updatefilter[key].indexOf(term);
    updatefilter[key].splice(filterIndex, 1);

    if(term === "Sans") {
      const sansSubclass = ["Humanist", "Grotesque", "Geometric"];
      sansSubclass.forEach(subTerm => {
        const subTermIndex = updatefilter.subclassification.indexOf(subTerm);
        if(subTermIndex !== -1) {
          updatefilter.subclassification.splice(filterIndex, 1);
        }
      });
    }

    if(term === "Serif") {
      const sansSubclass = ["Old Style", "Transitional", "Modern", "Contemporary"];
      sansSubclass.forEach(subTerm => {
        const subTermIndex = updatefilter.subclassification.indexOf(subTerm);
        if(subTermIndex !== -1) {
          updatefilter.subclassification.splice(filterIndex, 1);
        }
      });
    }
  }

  return updatefilter;

}

export default updateFilters;