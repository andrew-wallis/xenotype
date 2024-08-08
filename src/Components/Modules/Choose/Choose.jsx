import { useContext } from "react";
import { AppContext } from "../../../App";
import ChooseFilters from "./ChooseFilters";
import ChooseSelect from "./ChooseSelect";
import updateFilters from "./helpers/updateFilters";

function Choose({showFilters, filter, setFilter, sortedFonts, setModal, chooseFont}) {;
  

  //  React Hooks

  const context = useContext(AppContext);

  // Functions

  const handleChooseFont = (font) => {
    chooseFont(font);
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
      <ChooseSelect fonts={sortedFonts} activeFont={context.primaryFont} chooseFont={handleChooseFont} setModal={setModal} sampleText={context.sampleText} />
    </div>
  );
}

export default Choose;