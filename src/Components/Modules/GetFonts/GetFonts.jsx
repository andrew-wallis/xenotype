import GetFontsSample from "./GetFontsSample";

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
        <h1 className="uppercase tracking-wider font-black text-center leading-5">{content.secondaryFont ? "Get These Fonts" : "Get This Font"}</h1>
      </header>
      <div className="flex-1 flex justify-center gap-8">

        <div className="w-1/2"><GetFontsSample font={content.primaryFont} sampleText={content.sampleText} /></div>
        {content.secondaryFont && <div className="w-1/2"><GetFontsSample font={content.secondaryFont} sampleText={content.sampleText} /></div>}
      </div>
    </div>
  );
}

export default GetFonts;