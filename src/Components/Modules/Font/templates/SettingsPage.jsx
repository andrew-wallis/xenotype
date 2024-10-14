import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getFontFamily from "../../../../utils/getFontFamily";
import { useContext } from "react";
import { FontContext } from "../Font";

function SettingsPage() {

  const {primaryFont, secondaryFont, swap} = useContext(FontContext);

  let thisFont = primaryFont;
  let pairingFont = Object.keys(secondaryFont).length > 0 ? secondaryFont : primaryFont;

  if(swap) {
    let swapThisFont = {...thisFont};
    thisFont = pairingFont;
    pairingFont = swapThisFont;
  }
  const title = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${1.5 / thisFont.adjust}rem`,
    lineHeight: "1.5rem"
  }

  const heading = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1 / pairingFont.adjust}rem`,
    lineHeight: "1.25rem"
  }

  const text = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.875 / pairingFont.adjust}rem`,
    lineHeight: "1.125rem"
  }

  return (
    <div className="p-4">
      <style>
        @import url('{getFontStylesheet(thisFont, ["rg"])}');
        @import url('{getFontStylesheet(pairingFont, ["rg"])}');
      </style>
      <div style={{...title}} className="font-semibold mb-12">
        Settings
      </div>
      <div className="grid grid-cols-3 gap-4 text-gray-800 pb-12 mb-12 border-b border-gray-100">
        <div className="pr-8">
          <div style={{...heading}} className="font-semibold mb-4">
            About You
          </div>
          <div style={{...text}}>
            Manage your personal information and control who can see it.
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-6 gap-x-4 gap-y-8">
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                First Name
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                Layla
              </div>
            </div>
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                Last Name
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                Johnson
              </div>
            </div>
            <div className="col-span-4">
              <div className="font-semibold mb-2" style={{...text}}>
                Email Address
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                layla.johnson@fontcorp.com
              </div>
            </div>
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                Organisation
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                Font Corp
              </div>
            </div>
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                Role
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                Designer
              </div>
            </div>
            <div className="col-span-6">
              <div className="font-semibold mb-2" style={{...text}}>
                Visibility
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-gray-200 h-6 w-6"></div>
                  <div style={{...text}} className="">Anyone</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-gray-200 h-6 w-6"></div>
                  <div style={{...text}} className="">Your organisation</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-gray-200 h-6 w-6"></div>
                  <div style={{...text}} className="">No one</div>
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="inline-block font-semibold px-3 py-[9px] bg-gray-100 rounded text-center" style={{...text}}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-gray-800 pb-12 mb-12 border-b border-gray-100">
        <div className="pr-8">
          <div style={{...heading}} className="font-semibold mb-4">
            Password
          </div>
          <div style={{...text}}>
            You will stay logged in after you change your password.
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-6 gap-x-4 gap-y-8">
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                Current Password
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                ••••••••
              </div>
            </div>
            <div className="col-span-3">
            </div>
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                New Password
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                ••••••••
              </div>
            </div>
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                Confirm New Password
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                ••••••••
              </div>
            </div>
            <div className="col-span-6">
              <div className="inline-block font-semibold px-3 py-[9px] bg-gray-100 rounded text-center" style={{...text}}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-gray-800 pb-12 mb-12 border-b border-gray-100">
        <div className="pr-8">
          <div style={{...heading}} className="font-semibold mb-4">
            Language and Location
          </div>
          <div style={{...text}}>
            This setting will be used for all your services.
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-6 gap-x-4 gap-y-8">
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                Language
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                English (US)
              </div>
            </div>
            <div className="col-span-3">
              <div className="font-semibold mb-2" style={{...text}}>
                Time Zone
              </div>
              <div className="px-3 py-[9px] border border-gray-200 rounded" style={{...text}}>
                Eastern Daylight Time (UTC-4)
              </div>
            </div>
            <div className="col-span-6">
              <div className="inline-block font-semibold px-3 py-[9px] bg-gray-100 rounded text-center" style={{...text}}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-gray-800">
        <div className="pr-8">
          <div style={{...heading}} className="font-semibold mb-4">
            Delete Account
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-6 gap-x-4 gap-y-8">
            <div className="col-span-6">
              <div className="p-4 bg-gray-100 rounded" style={{...text}}>
                Once you delete your account, you will lose access to all services.
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex items-center gap-4">
                <div className="rounded border border-gray-200 h-6 w-6"></div>
                <div style={{...text}} className="">I confirm that I want to delete my password</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="inline-block font-semibold px-3 py-[9px] bg-gray-800 text-white rounded text-center" style={{...text}}>
                Delete Account
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;