import { useContext } from "react";
import { FontContext } from "./Font";
import About from "../../../assets/About.svg";
import Pairings from "../../../assets/Pairings.svg";
import Alternatives from "../../../assets/Alternatives.svg";
import Test from "../../../assets/Test.svg";

function FontNav({}) {

  const contextFont = useContext(FontContext);

  const chooseModule = (e, module) => {
    e.preventDefault();
    contextFont.setActiveModule(module);
  }
  
  const getIcon = (module) => {
    switch(module) {
      case "About":
        return About;
      case "Pairings":
        return Pairings;
      case "Test":
        return Test;
      case "Alternatives":
        return Alternatives;
    }
  }

  return (
    <>
      {contextFont.modules.map((module) => (
        <a key={module} className={`block h-12 text-center text-[12px] leading-none text-gray-800 ${(module === contextFont.activeModule) ? "opacity-100" : "opacity-60"}`} href="#" onClick={(e) => chooseModule(e, module)}>
          <img className="mx-auto block my-1" src={getIcon(module)} />
          {module}
        </a>
      ))}
    </>
  );
}

export default FontNav;