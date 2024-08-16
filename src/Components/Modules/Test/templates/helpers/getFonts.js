function getFonts(context) {

  let thisFont = {};
  let pairingFont = {};

  if(context.pairing) {
    thisFont = context.primaryFont;
    pairingFont = context.secondaryFont;
  } else {
    thisFont = context.primaryFont;
    pairingFont = context.primaryFont;
  }

  return [thisFont, pairingFont];

}

export default getFonts;