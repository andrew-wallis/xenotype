function getFonts(context) {

  let thisFont = {};
  let pairingFont = {};

  if(context.pairing) {
    if(!context.swap) {
      thisFont = context.primaryFont;
      pairingFont = context.secondaryFont;
    } else {
      thisFont = context.secondaryFont;
      pairingFont = context.primaryFont;
    }
  } else {
    thisFont = context.primaryFont;
    pairingFont = context.primaryFont;
  }

  return [thisFont, pairingFont];

}

export default getFonts;