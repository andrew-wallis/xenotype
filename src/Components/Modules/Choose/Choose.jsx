import { useContext } from "react";
import { AppContext } from "../../../App";
import ChooseSelect from "./ChooseSelect";

function Choose({sortedFonts, setModal, handleChoose}) {;
  

  //  React Hooks

  const context = useContext(AppContext);

  // Functions

  const chooseFont = (font) => {
    handleChoose(font);
  }

  return (
    <div className="flex overflow-hidden w-full max-w-[68rem] mx-auto px-4">
      <ChooseSelect fonts={sortedFonts} activeFont={context.primaryFont} chooseFont={chooseFont} setModal={setModal} sampleText={context.sampleText} />
    </div>
  );
}

export default Choose;