import ArrowIcon from "../../Elements/Icons/ArrowIcon";
import Checkbox from "../../Elements/Checkbox";

function FilterSelect({children, options, id, subId, open, setOpen, filter, handleFilter}) {

  function handleOpen(e) {
    e.preventDefault(); 
    if(open !== id) {
      setOpen(id);
    } else {
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <a href="#" onClick={(e) => handleOpen(e)} className={`flex items-center gap-1 rounded-full text-xs leading-4.5 pl-4.5 pr-[11px] py-2.25 uppercase tracking-wider font-semibold text-gray-800 ${filter[id].length > 0 || open === id ? "bg-gray-300" : "bg-gray-200 "}`}>
        <div>{children}</div>
        <div className={`text-gray-600 transition-all duration-300 ease-out ${open === id ? "rotate-180" : ""}`}>
          <ArrowIcon direction="Down" />
        </div>
      </a>
      {open === id && 
        <ul className="min-w-full absolute top-[calc(100%_+_3px)] left-0 z-10 p-3 border-[1.5px] border-gray-100 bg-white">
          {Object.entries(options).map(([key, val]) => (
            <li>
              <Checkbox value={key} id={id} callback={handleFilter} checked={filter[id].includes(key)} />
              {typeof val === "object" && filter[id].includes(key) && 
                <ul className="ml-2">
                  {Object.entries(val).map(([subKey, subVal]) => (
                    <Checkbox value={subKey} id={subId} callback={handleFilter} checked={filter[subId].includes(subKey)}/>
                  ))}
                </ul>
              }
            </li>
          ))}
        </ul>
      }
    </div>

  );
}

export default FilterSelect;