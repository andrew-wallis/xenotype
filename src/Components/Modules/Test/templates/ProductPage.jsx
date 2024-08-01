import { useContext } from "react";
import { WindowContext } from "../../../../Window";
import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getFontFamily from "../../../../utils/getFontFamily";
import getFonts from "./helpers/getFonts";

function ProductPage() {

  const context = useContext(WindowContext);
  const [thisFont, pairingFont] = getFonts(context);

  const title = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${2.25 / thisFont.adjust}rem`,
    lineHeight: "2.5rem"
  }

  const price = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1.25 / pairingFont.adjust}rem`,
    lineHeight: "1.5rem"
  }

  const subtitle = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${1.25 / pairingFont.adjust}rem`,
    lineHeight: "1.5rem"
  }

  const text = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.875 / pairingFont.adjust}rem`,
    lineHeight: "1rem"
  }

  const subtext = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.75 / pairingFont.adjust}rem`,
    lineHeight: "0.875rem"
  }

  const button = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.875 / pairingFont.adjust}rem`,
    lineHeight: "1rem"
  }

  return (
    <div className="mx-4">
      <div className="grid grid-cols-2 gap-8 relative mb-16">
        <style>
          @import url('{getFontStylesheet(context.primaryFont, ["rg"])}');
          @import url('{getFontStylesheet(context.secondaryFont, ["rg"])}');
        </style>
        <div className="">
          <div className="pt-[125%] bg-gray-100 dark:bg-gray-900/50 sticky top-0 rounded-sm"></div>
        </div>
        <div className="">
          <div style={{...text}} className="text-gray-800 dark:text-gray-300 mb-6">Men<span className="px-4">/</span>Shirts</div>
          <h1 style={{...title}} className="font-semibold mb-6">The Oxford</h1>
          <div style={{...price}} className="font-semibold mb-6"><span className="text-gray-600 dark:text-gray-500 line-through mr-4">$50</span>$45</div>
          <div className="mb-12">★★★★★ <span className="text-gray-800 dark:text-gray-300" style={{...text}}>(4.6)</span></div>
          <div style={{...text}} className="mb-4 text-gray-800 dark:text-gray-300"><span className="font-semibold text-black dark:text-gray-200 mr-4">Color</span>Light Blue</div>
          <div className="flex mb-6 gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 outline outline-offset-2 outline-2 outline-gray-300 dark:outline-gray-800"></div>
            <div className="w-10 h-10 rounded-full bg-gray-100"></div>
            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
            <div className="w-10 h-10 rounded-full bg-gray-800"></div>
          </div>
          <div style={{...text}} className="mb-4 text-gray-800 dark:text-gray-300"><span className="font-semibold text-black dark:text-gray-200 mr-4">Size</span><span className="underline">Sizing Guide</span></div>
          <div style={{...text}} className="flex mb-12 gap-3">
            <div className="rounded-lg bg-gray-100 dark:bg-gray-900/50 w-12 h-12 flex justify-center items-center outline outline-offset-2 outline-2 outline-gray-300 dark:outline-gray-700">XS</div>
            <div className="rounded-lg bg-gray-100 dark:bg-gray-900/50 w-12 h-12 flex justify-center items-center">S</div>
            <div className="rounded-lg bg-gray-100 dark:bg-gray-900/50 w-12 h-12 flex justify-center items-center">M</div>
            <div className="rounded-lg bg-gray-100 dark:bg-gray-900/50 w-12 h-12 flex justify-center items-center">L</div>
            <div className="rounded-lg bg-gray-100 dark:bg-gray-900/50 w-12 h-12 flex justify-center items-center">XL</div>
          </div>
          <div className="flex gap-2 mb-8">
            <div style={{...button}} className="flex-1 text-center rounded-full bg-black dark:text-black dark:bg-gray-200 text-white font-semibold uppercase tracking-wider py-4">Add To Bag</div>
            <div style={{...button}} className="flex-1 text-center rounded-full text-gray-800 dark:text-gray-300 border border-gray-300 font-semibold uppercase tracking-wider py-4">Buy It Now</div>
          </div>
          <div className="mb-4">
            <div style={{...text}} className="font-semibold mb-1 text-gray-800 dark:text-gray-300">Free Shipping</div>
            <div style={{...subtext}}>For orders over $50. Shipping details</div>
          </div>
          <div className="">
            <div style={{...text}} className="font-semibold mb-1 text-gray-800 dark:text-gray-300">Easy Returns</div>
            <div style={{...subtext}}>Return within 45 days of ship date for a fee of £5 Duties & taxes refundable upon return of product. Returns Details</div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        {["Product Details", "Materials", "Care"].map((heading) => (
          <div style={{...subtitle}} className="relative border-b border-gray-200 py-6 font-semibold text-gray-800 dark:text-gray-200">
            {heading}
            <div className="absolute top-6 right-6 p-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6H12M6 0L6 12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>

          </div>
        ))}
      </div>
      <div className="my-24">
        <div style={{...subtitle}} className="mb-8 text-center font-semibold">You May Also Like</div>
        <div className="grid grid-cols-4 gap-8 text-gray-800 dark:text-gray-200">
          {["Short Sleeve Oxford", "Long Sleeve Linen", "Short Sleeve Linen", "Long Sleeve Dress"].map((heading) => (
            <div>
              <div className="pt-[125%] bg-gray-100 dark:bg-gray-900 rounded-sm mb-4"></div>
              <div style={{...text}} className="mb-2">{heading}</div>
              <div style={{...subtext}} className="font-semibold"><span className="text-gray-600 dark:text-gray-400 line-through mr-2">$50</span>$45</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;