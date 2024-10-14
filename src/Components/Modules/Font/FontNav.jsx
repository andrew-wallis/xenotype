import { useContext } from "react";
import { FontContext } from "./Font";


function FontNav({}) {

  const {swap, setSwap, secondaryFont, templates} = useContext(FontContext);

  const items = ["Templates", "Swap", "Style", "Get Fonts"];

  const linkClasses = "block h-12 text-center text-[12px] leading-none flex flex-col gap-1 items-center";

  const handleSwap = (e) => {
    e.preventDefault();

    if(Object.keys(secondaryFont).length > 0) {
      setSwap(!swap);
    }
  }

  return (
    <nav className="sticky mx-8 nav-position">
      <div className="grid bg-dark-bg/40 grid-cols-4 justify-between p-2 gap-4 rounded-full backdrop-blur-md">
        <a className={linkClasses} href="#" onClick={(e) => {}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1409_2293)">
              <path d="M12 4H24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 8H24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 12H24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M0 16H24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M0 20H24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M2.07734 13H0.446655L4.11072 2.81818H5.88558L9.54964 13H7.91896L5.04041 4.66761H4.96086L2.07734 13ZM2.35077 9.01278H7.64055V10.3054H2.35077V9.01278Z" fill="currentColor"/>
            </g>
          </svg>
          Templates
        </a>
        <a className={`${linkClasses} ${Object.keys(secondaryFont).length > 0 ? "" : "opacity-40 cursor-disabled"}`} href="#" onClick={(e) => {handleSwap(e)}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1409_2285)">
              <path d="M15.1613 19H8.48135V18.28C9.16135 18.22 10.3613 18.04 10.3613 17.72C10.3613 17.6 10.3213 17.44 10.2613 17.28L9.10135 14.28H4.28135C4.02135 14.92 3.72135 15.72 3.54135 16.3C3.36135 16.9 3.30135 17.2 3.30135 17.42C3.30135 18.04 4.66135 18.22 5.34135 18.28V19H-0.118652V18.28C0.241348 18.26 0.861348 18.14 1.20135 17.92C1.68135 17.64 2.00135 17.26 2.28135 16.56C3.72135 13.06 5.36135 8.86 6.94135 4.94H8.32135C9.42135 7.64 12.6013 15.88 13.0413 16.92C13.2213 17.36 13.4613 17.66 13.9013 17.94C14.2613 18.14 14.7813 18.24 15.1613 18.28V19ZM8.72135 13.38L6.66135 8.18L4.64135 13.38H8.72135Z" fill="currentColor"/>
              <path d="M16.0773 13H14.4467L18.1107 2.81818H19.8856L23.5496 13H21.919L19.0404 4.66761H18.9609L16.0773 13ZM16.3508 9.01278H21.6405V10.3054H16.3508V9.01278Z" fill="currentColor"/>
            </g>
          </svg>
          Swap
        </a>
        <a className={`${linkClasses} opacity-40 cursor-disabled`} href="#" onClick={(e) => {}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1487_1202)">
              <path d="M3.99999 4.5L5.73205 7.5H4.49999L4.49999 16H5.73205L4 19L2.26794 16H3.49999L3.5 7.5L2.26794 7.5L3.99999 4.5Z" fill="currentColor"/>
              <path d="M9.82478 19H7.49524L12.7296 4.45459H15.2651L20.4995 19H18.17L14.0577 7.09663H13.9441L9.82478 19ZM10.2154 13.304H17.7722V15.1506H10.2154V13.304Z" fill="currentColor"/>
            </g>
          </svg>
          Style
        </a>
        <a className={`${linkClasses}`} href="#" onClick={(e) => {}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1487_1212)">
              <path d="M21 7.5H23L19.5 4L16 7.5H18C18 11.1923 16 13.5 16 13.5C16 13.5 21 11.1923 21 7.5Z" fill="currentColor"/>
              <path d="M5.32478 19H2.99524L8.22961 4.45459H10.7651L15.9995 19H13.67L9.55774 7.09663H9.4441L5.32478 19ZM5.71541 13.304H13.2722V15.1506H5.71541V13.304Z" fill="currentColor"/>
            </g>
          </svg>
          Get Fonts
        </a>
      </div>
      <ul className="text-sm leading-none absolute bottom-full bg-dark-bg/60 rounded-2xl backdrop-blur-md p-4 flex flex-col gap-4 min-w-40">
        {templates.map((template) => (
          <li className="flex items-center gap-4">
            <div className="rounded-full w-1 h-1 bg-dark-secondary"></div>
            {template}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FontNav;