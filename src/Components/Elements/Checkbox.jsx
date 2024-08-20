function Checkbox({id, value, callback, checked}) {

  return (
    <div>
      <input 
        id={id+value} 
        type="checkbox"
        name={id} 
        value={value}
        defaultChecked={checked}
        onChange={() => callback(value, id)}
        className="hidden"
      />
      <label className="flex uppercase tracking-wider text-xs leading-5 font-semibold" htmlFor={id+value}>
        <div className="mr-2.5 w-5 h-5 rounded-lg border-[1.5px] border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
        {checked && 
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.25L6.5 10.75L4 8.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
          </svg>
        }
        </div>
        {value}
      </label>
    </div>
  );
}

export default Checkbox;