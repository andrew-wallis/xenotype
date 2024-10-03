function getFonts(props) {

  let thisFont = {};
  let pairingFont = {};

  if(Object.keys(props.pairing).length > 0) {
    pairingFont = props.pairing;
  } else {
    pairingFont = props.fonts;
  }

  if(Object.keys(props.alternative).length > 0) {
    thisFont = props.alternative;
  } else {
    thisFont = props.font;
  }

  return [thisFont, pairingFont];

}

export default getFonts;