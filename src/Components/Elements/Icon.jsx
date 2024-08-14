import ArrowIcon from "./Icons/ArrowIcon";
import FilterIcon from "./Icons/FilterIcon";
import PairIcon from "./Icons/PairIcon";
import ResetIcon from "./Icons/ResetIcon";
import SwapIcon from "./Icons/SwapIcon";
import UnpairIcon from "./Icons/UnpairIcon";

function Icon({callback, icon, active}) {

  function getIcon() {
    switch(icon) {
      case "Filter":
        return <FilterIcon />
      case "Pair":
        return <PairIcon />
      case "Unpair":
        return <UnpairIcon />
      case "Swap":
        return <SwapIcon />
      case "Reset":
        return <ResetIcon />
      case "ArrowLeft":
        return <ArrowIcon direction="Left" />
      case "ArrowRight":
        return <ArrowIcon direction="Right" />
    }
  }

  return (
    <a onClick={(e) => {e.preventDefault; callback()}} className={`text-gray-600 h-9 w-9 rounded-full flex items-center justify-center ${active ? "bg-gray-200" : "bg-gray-100"}`} href="#">
      {getIcon()}
    </a>
  );
}

export default Icon;