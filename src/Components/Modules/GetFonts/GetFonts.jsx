import GetFontsSample from "./GetFontsSample";

function GetFonts({content, close, action}) {

  return (
    <div className="p-8 flex flex-col h-full">
      <header className="shrink-0">
        <div className="flex justify-end mb-8">
          <a href="#" onClick={close} className="h-4 w-4 flex justify-center items-center">
            <span className="absolute bg-black h-[1.5px] w-3 rotate-45"></span>
            <span className="absolute bg-black h-[1.5px] w-3 -rotate-45"></span>
          </a>
        </div>
      </header>
      <div className="overflow-y-auto">
        <div className="flex-1 flex gap-8 mb-16">
          <div className="w-1/2">
            <GetFontsSample font={content.primaryFont}/>
          </div>
          {content.secondaryFont && 
            <div className="w-1/2">
              <GetFontsSample font={content.secondaryFont} sampleText={content.sampleText} />
            </div>
          }
        </div>
        <div className="max-w-[454px] mx-auto">
          <div className="text-center uppercase tracking-wider font-bold text-sm leading-5 mb-8">Thank you for trying UXType</div>
          <div className="text-sm leading-4 mb-8">To keep in touch with UXType and be the first to find out about new fonts and features, please sign up to our mailing list.</div>
          <div className="relative flex-1">
            <input value="" placeholder="Your Email" className="w-full rounded-full bg-gray-200 text-xs leading-5 pl-5 pr-30 py-2.5 text-gray-800"/>
            <a onClick={(e) => {e.preventDefault;}} href="#" className="block top-[2px] right-[2px] bottom-[2px] flex items-center justify-center w-24 absolute rounded-full bg-black text-white text-xs leading-5 uppercase tracking-wider">
              Sign Up
            </a>
          </div>
        </div>
        <div className="text-center mt-12">
          <a onClick={action} href="#" className="text-center mt-12 text-sm leading-4 underline decoration-gray-700 underline-offset-4">
            Find another font
          </a>
        </div>

      </div>
    </div>
  );
}

export default GetFonts;