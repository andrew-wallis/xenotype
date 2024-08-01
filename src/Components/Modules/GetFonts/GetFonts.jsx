function GetFonts({content, close}) {

  return (
    <div className="p-8 flex flex-col h-full">
      <header className="shrink-0 mb-12">
        <div className="flex justify-end mb-8">
          <a href="#" onClick={(e) => {e.preventDefault(); close()}} className="h-4 w-4 flex justify-center items-center">
            <span className="absolute bg-black h-[1.5px] w-3 rotate-45"></span>
            <span className="absolute bg-black h-[1.5px] w-3 -rotate-45"></span>
          </a>
        </div>
        <div className="flex justify-between">
          Get These Fonts
        </div>
      </header>
      <div className="flex-1">
        {content.primaryFont.label}
        {content.secondaryFont.label}
      </div>
    </div>
  );
}

export default GetFonts;