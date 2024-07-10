function CTA({callback, children}) {

  return (
    <a onClick={(e) => {e.preventDefault(); callback()}} className="inline-block relative rounded-full py-2.5 pl-5 pr-10 bg-gray-100 dark:bg-gray-900 uppercase tracking-wider text-sm leading-5 font-bold" href="#">
    {children}
    <div className="p-px absolute top-2.5 right-2.5 -rotate-90 text-gray-800 dark:text-gray-300">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10L12 6H4L8 10Z" fill="currentColor"/>
      </svg>
    </div>
  </a>
  );
}

export default CTA;