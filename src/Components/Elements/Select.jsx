function Select({label, id, value, callback, options}) {

  return (
    <div className="relative">
      <div className="p-px absolute top-2.5 right-3.5 text-gray-800 dark:text-gray-300">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10L12 6H4L8 10Z" fill="currentColor"/>
        </svg>
      </div>
      <label htmlFor={id} className="sr-only">{label}</label>
      <select 
        className="appearance-none rounded-full py-2.5 pr-10 pl-5 bg-transparent bg-gradient-to-b from-gray-100/80 to-gray-100 dark:from-gray-900 dark:to-gray-900/80 uppercase tracking-wider text-sm leading-5 font-bold" 
        id={id} 
        value={value} 
        onChange={(e) => callback(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;