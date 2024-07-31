import _ from "lodash";

/**
 * Builds and returns URL for loading Adobe/Google fonts
 * @param { string } font 
 * @param { object } widths 
 * @returns { string }
 */
function getFontStylesheet(font, widths) {

  const stylesheets = [];

  if(font.distribution === "Google") {


    widths.forEach((width) => {
      const weightVar = (font[width].includes("i") ? "ital,wght" : "wght");
      const weightArray = font[width].split(";");
      const processedArray = [];
  
      weightArray.forEach((val) => {
        if(font.rg.includes("i")) {
          if(!val.includes("i")) {
            processedArray.push(`0,${val}`);
          }
        } else {
          processedArray.push(val);
        }
      });
  
      weightArray.forEach((val) => {
        if(val.includes("i")) {
          processedArray.push(`1,${val.substring(0, val.length - 1)}`)
        }
      });

      const getName = (width !== "rg" ? `${font.name} ${_.capitalize(width)}` : font.name);
  
      stylesheets.push(`https://fonts.googleapis.com/css2?family=${getName.replace(/\s+/g, '+')}:${weightVar}@${processedArray.join(";")}&display=block`);
      //                https://fonts.googleapis.com/css2?family=Karla                          :ital,wght   @0,200..800;1,200..800&display=block
      //                https://fonts.googleapis.com/css2?family=Bricolage+Grotesque            :opsz,wght   @12..96,200..800&display=swap" rel="stylesheet">
    })


  } else if (font.distribution === "Adobe" && font.stylesheet) {
    stylesheets.push(`https://use.typekit.net/${font.stylesheet}.css`);
  }

  return stylesheets;

}

export default getFontStylesheet;