function BackLink({callback}) {

  function handleClick(e) {
    e.preventDefault();
    callback();
  }

  return (
    <a className="relative pl-5 py-2.5 block uppercase tracking-wider font-bold text-sm leading-5" href="#" onClick={(e) => handleClick(e)}>
    <div className="inline-block rotate-90 p-px absolute top-2.5 left-0 text-gray-800 dark:text-gray-300">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10L12 6H4L8 10Z" fill="currentColor"/>
      </svg>
    </div>
    Back
  </a>
  );
}

export default BackLink;