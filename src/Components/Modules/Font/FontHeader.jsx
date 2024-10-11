import { useContext } from "react";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";

function FontHeader({children}) {

  const {setActiveFont} = useContext(AppContext);
  const {activeModule, positions} = useContext(FontContext);


  // Functions

  const backButton = (e) => {
    e.preventDefault();
    setActiveFont({});
  }

  return (
    <header className="sticky z-50 top-0 inset-x-0 bg-white p-4">
      <div className="grid grid-cols-4 gap-2 pb-4">
        <div className="text-sm leading-4">
          <a href="#" onClick={(e) => backButton(e)}>All Fonts</a>
        </div>
        <h1 className="col-span-2 text-center uppercase tracking-wider font-semibold text-sm leading-4">
          {activeModule} {Object.entries(positions).map(([key, val]) => (val))}
        </h1>
      </div>
      { children }
    </header>
  );
}

export default FontHeader;