import ArrowIcon from "../../Elements/Icons/ArrowIcon";
import Checkbox from "../../Elements/Checkbox";

function SortSelect({children, sort, setSort, sortOptions, open, setOpen}) {

  function handleOpen(e) {
    e.preventDefault(); 
    if(open !== "Sort") {
      setOpen("Sort");
    } else {
      setOpen(false)
    }
  }

  function handleSort(e, val) {
    e.preventDefault();
    setSort(val);
    setOpen(false);
  }

  return (
    <div className="relative">
      <a href="#" onClick={(e) => handleOpen(e)} className="flex items-center gap-1 rounded-full bg-gray-200 text-xs leading-4.5 pl-4.5 pr-[11px] py-2.25 uppercase tracking-wider font-semibold text-gray-800">
        <div>{children}</div>
        <div className={`text-gray-600 transition-all duration-300 ease-out ${open === "Sort" ? "rotate-180" : ""}`}>
          <ArrowIcon direction="Down" />
        </div>
      </a>
      {open === "Sort" && 
        <ul className="min-w-full absolute top-[calc(100%_+_3px)] left-0 z-10 border-[1.5px] border-gray-100 bg-white">
          {sortOptions.map((val) => (
            <li>
              <a href="#" onClick={(e) => handleSort(e, val)} className={`block py-1.5 px-3 uppercase tracking-wider text-xs leading-5 font-semibold ${sort === val ? "bg-gray-200" : "hover:bg-gray-100"}`}>{val}</a>
            </li>
          ))}
        </ul>
      }
    </div>

  );
}

export default SortSelect;