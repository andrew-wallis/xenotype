/**
 * Processes font name into font-family readable by Google/Adobe
 * @param { string } name 
 * @param { name } width 
 * @returns { string } String containing font-family and fallback
 */

function getFontFamily(font, width) {

  let idName = font.name;

  if(font[width].includes("-")) {
    const weightArray = font[width].split("-");
    if(weightArray.length !== 0) {
      idName = `${idName} ${weightArray[0]}`
    }
  } else if(width !== "rg") {
    idName = `${idName} ${width}`;
  }

  if(font.distribution === "Google") {
    return `"${idName}", ${font.superclass}`;
  } else if (font.distribution === "Adobe") {
    const dataName = idName.toLowerCase().replace(/\s+/g, '-');
    return `"${dataName}", ${font.superclass}`;
  } else {
    return false;
  }
}

export default getFontFamily;