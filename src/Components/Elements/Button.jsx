function Button({callback, children, active}) {
  
  function handleClick(e) {
    e.preventDefault;
    callback();
  }

  return (
    <button onClick={(e) => handleClick(e)} className={`rounded-full py-2.5 px-5 uppercase tracking-wider text-sm leading-5 font-bold bg-gradient-to-b select-none ${active ? "from-gray-300/60 to-gray-300/40 dark:from-gray-700/60 dark:to-gray-700/40" : "from-gray-100/80 to-gray-100 dark:from-gray-900 dark:to-gray-900/80"}`}>
      {children}
    </button>
  );
}

export default Button;