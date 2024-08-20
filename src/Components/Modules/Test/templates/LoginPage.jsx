import { useContext } from "react";
import { AppContext } from "../../../../App";
import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getFontFamily from "../../../../utils/getFontFamily";
import getFonts from "./helpers/getFonts";

function LoginPage() {

  const context = useContext(AppContext);
  const [thisFont, pairingFont] = getFonts(context);

  const title = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${2 / thisFont.adjust}rem`,
    lineHeight: "2rem"
  }

  const text = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${0.875 / thisFont.adjust}rem`,
    lineHeight: "1.125rem"
  }

  return (
    <div className="mx-auto max-w-80">
      <style>
        @import url('{getFontStylesheet(context.primaryFont, ["rg"])}');
        @import url('{getFontStylesheet(context.secondaryFont, ["rg"])}');
      </style>
      <div style={{...title}} className="font-semibold text-center mb-8">
        Welcome back
      </div>
      <div style={{...text}} className="mb-4 px-4 py-3 border border-gray-200 rounded text-gray-500">
        Email address
      </div>
      <div style={{...text}} className="mb-6 px-4 py-3 border border-gray-200 rounded text-gray-500">
        Password
      </div>
      <div className="mb-6 flex gap-4 items-center">
        <div className="w-6 h-6 border border-gray-200 rounded"></div>
        <div style={{...text}}>Remember me?</div>
      </div>
      <div style={{...text}} className="font-semibold px-4 py-3 bg-gray-100 rounded text-center">
        Sign in
      </div>
      <div className="relative my-8 pt-4 after:absolute after:block after:content-[''] after:h-px after:inset-x-0 after:bg-gray-200 after:inset-1/2">
        <div className="absolute w-full z-10 top-0 flex justify-center">
          <div style={{...text}} className="px-4 bg-white text-gray-800">or</div>
        </div>
      </div>
      <div style={{...text}}  className="mb-2 flex gap-4 px-4 py-3 bg-white text-gray-800 w-full border border-gray-200 rounded">
        <div className="flex-grow text-center">Sign in with Google</div>
      </div>
      <div style={{...text}} className="mb-2 flex gap-4 px-4 py-3 bg-white text-gray-800 w-full border border-gray-200 rounded">
        <div className="flex-grow text-center">Sign in with Microsoft</div>
      </div>
      <div style={{...text}} className="mb-2 flex gap-4 px-4 py-3 bg-white text-gray-800 w-full border border-gray-200 rounded">
        <div className="flex-grow text-center">Sign in with Apple</div>
      </div>
      <hr className="border-t-1 border-t-gray-200 my-8" />
      <div style={{...text}} className="mb-12 text-gray-800 text-center">
        Don’t have an account? <span className="underline">Sign Up</span>
      </div>
      <div style={{...text}} className="mb-24 text-gray-800 text-center">
        Terms of Use | Privacy Policy
      </div>
    </div>
  );
}

export default LoginPage;