import ArrowIcon from "./Icons/ArrowIcon";
import FilterIcon from "./Icons/FilterIcon";
import PairIcon from "./Icons/PairIcon";
import ResetIcon from "./Icons/ResetIcon";
import SwapIcon from "./Icons/SwapIcon";
import UnpairIcon from "./Icons/UnpairIcon";

function Icon({callback, icon, active, label, rotate}) {

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

  const handleClick = (e) => {
    e.preventDefault();
    callback();
  }


  return (
    <a onClick={(e) => {handleClick(e)}} className={`icon relative text-gray-600 h-9 w-9 rounded-full flex items-center justify-center ${active ? "bg-gray-200" : "bg-gray-100"}`} href="#">
      <div className={`translate-rotate duration-300 ease-out ${rotate ? "rotate-180" : ""}`}>
        {getIcon()}
      </div>
      {label &&
        <div className="icon-label absolute top-full pt-2 w-[96px] flex justify-center">
          <div className="flex py-1.5 px-3 rounded-[4px] bg-gray-100 text-gray-700 font-medium text-sm leading-4 text-center">{label}</div>
        </div>
      }
    </a>
  );
}

export default Icon;