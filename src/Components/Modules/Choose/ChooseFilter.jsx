function ChooseFilter({filterKey, value, filter, handleFilter}) {

  return (
    <div className="mb-2.5">
      <input 
        id={filterKey+value} 
        type="checkbox"
        name={filterKey} 
        value={value}
        defaultChecked={filter[filterKey].includes(value) ? true : false}
        onChange={(e) => handleFilter(value, filterKey)}
        className="hidden"
      />
      <label className="flex uppercase tracking-wider text-xs leading-5 font-bold" htmlFor={filterKey+value}>
        <div className="mr-2.5 w-5 h-5 rounded-lg border-[1.5px] border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
        {filter[filterKey].includes(value) && 
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.25L6.5 10.75L4 8.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        }
        </div>
        {value}
      </label>
    </div>
  );
}

export default ChooseFilter;