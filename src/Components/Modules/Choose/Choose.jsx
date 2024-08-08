import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import ChooseFilters from "./ChooseFilters";
import updateFilters from "./helpers/updateFilters";
import ChooseSelect from "./ChooseSelect";

function Choose({showFilters, filter, setFilter}) {;
  

  //  React Hooks

  const context = useContext(AppContext);

  // Functions

  const chooseFont = (font) => {
    context.setPrimaryFont(font);
    context.setSecondaryFont({});
    context.changeModule("Pair");
  }

  const handleFilter = (term, key) => {
    setFilter(updateFilters(filter, term, key));
  }

  return (
    <div className="flex overflow-hidden w-full max-w-[68rem] mx-auto">
      <aside className={`custom-scrollbar overflow-y-auto transition-[width] duration-300 ease-out ${showFilters ? "w-48 mr-6 px-4" : "w-0 mr-0"} `}>
        {showFilters &&
          <ChooseFilters filter={filter} handleFilter={handleFilter} />
        }
      </aside>
      <ChooseSelect fonts={context.sortedFonts} activeFont={context.primaryFont} chooseFont={chooseFont} setModal={context.setModal} sampleText={context.sampleText} />
    </div>
  );
}

export default Choose;