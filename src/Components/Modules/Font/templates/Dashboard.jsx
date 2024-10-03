import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getFontFamily from "../../../../utils/getFontFamily";

function Dashboard({font, pairing, alternative}) {

  const thisFont = Object.keys(alternative).length > 0 ? alternative : font;
  const pairingFont = Object.keys(pairing).length > 0 ? pairing : font;

  const text = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.875 / pairingFont.adjust}rem`,
    lineHeight: `${0.875 / pairingFont.adjust}rem`
  }

  const label = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.75 / pairingFont.adjust}rem`,
    lineHeight: `${0.75 / pairingFont.adjust}rem`
  }

  const stat = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${2.25 / thisFont.adjust}rem`,
    lineHeight: `${2.25 / thisFont.adjust}rem`
  }

  const statsmall = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1 / pairingFont.adjust}rem`,
    lineHeight: `${1 / pairingFont.adjust}rem`
  }

  return (
    <div className="flex h-full bg-gray-100/50 text-gray-800">
      <style>
        @import url('{getFontStylesheet(context.primaryFont, ["rg"])}');
        @import url('{getFontStylesheet(context.secondaryFont, ["rg"])}');
      </style>
      <div style={{...text}} className="bg-gray-100 w-56 p-3 font-semibold">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <ul className="pt-8 flex flex-col">
          {["Clients", "Cases", "Projects", "Teams", "Documents" , "Reporting"].map((item) => (
            <li className={`p-2 rounded-md ${item === "Cases" ? "bg-gray-200" : ""}`}>
              <div className="py-1 pl-8">{item}</div>
            </li>
          ))} 
        </ul>
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4 mb-8 mt-[72px]">
          <div className="">
            <div style={{...label}} className="text-gray-700 mb-1 font-medium">Open Cases</div>
            <div style={{...stat}} className="font-semibold">120</div>
          </div>
          <div className="">
            <div style={{...label}} className="text-gray-700 mb-1 font-medium">Overdue Cases</div>
            <div style={{...stat}} className="font-semibold">32</div>
          </div>
          <div className="">
            <div style={{...label}} className="text-gray-700 mb-1 font-medium">Cases On Time</div>
            <div style={{...stat}} className="font-semibold">89%</div>
          </div>
          <div className="">
            <div style={{...label}} className="text-gray-700 mb-1 font-medium">Avg Response TIme</div>
            <div style={{...stat}} className="font-semibold">3<span style={{...statsmall}}> days</span></div>
          </div>
        </div>
        <div className="">
          <div style={{...label}} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-semibold">
            <div>Client</div>
            <div>Created</div>
            <div>Due</div>
            <div>Status</div>
          </div>
          <div style={{...text}} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-medium">
            <div>57396029</div>
            <div>03/07/2024</div>
            <div>07/07/2024</div>
            <div>New</div>
          </div>
          <div style={{...text}} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-medium">
            <div>78068940</div>
            <div>03/07/2024</div>
            <div>13/07/2024</div>
            <div>New</div>
          </div>
          <div style={{...text}} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-medium">
            <div>21647582</div>
            <div>03/07/2024</div>
            <div>13/07/2024</div>
            <div>New</div>
          </div>
          <div style={{...text}} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-medium">
            <div>79503867</div>
            <div>02/07/2024</div>
            <div>12/07/2024</div>
            <div>In Progress</div>
          </div>
          <div style={{...text}} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-medium">
            <div>19385759</div>
            <div>01/07/2024</div>
            <div>03/07/2024</div>
            <div>Overdue</div>
          </div>
          <div style={{...text}} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-medium">
            <div>58690320</div>
            <div>01/07/2024</div>
            <div>07/07/2024</div>
            <div>In Progress</div>
          </div>
          <div style={{...text}} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200 font-medium">
            <div>79403860</div>
            <div>01/07/2024</div>
            <div>07/07/2024</div>
            <div>In Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;