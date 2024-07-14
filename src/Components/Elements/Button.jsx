function Button({callback, children}) {
  
  function handleClick(e) {
    e.preventDefault;
    callback();
  }

  return (
    <button onClick={(e) => handleClick(e)} className="rounded-full py-2.5 px-5 uppercase tracking-wider text-sm leading-5 font-bold bg-gradient-to-b from-gray-100/80 to-gray-100 dark:from-gray-900 dark:to-gray-900/80 select-none">
      {children}
    </button>
  );
}

export default Button;