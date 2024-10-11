function FontWeights({font}) {
  let weights;

  function getFontLabel(weight) {
    switch (weight) {
      case 100:
        return "Thin"
      case 200:
        return "Extra Light"
      case 300:
        return "Light"
      case 400:
        return "Regular"
      case 500:
        return "Medium"
      case 600:
        return "Semibold"
      case 700:
        return "Bold"
      case 800:
        return "Extra Bold"
      case 900:
        return "Black"
      case 1000:
        return "Extra Black"
    }
  }

  function getItalics(weight, weights) {
    if(weights.includes(weight + "i")) {
      return <div className="italic">Italic</div>
    }
  }

  if(font.weight.includes("..")) {

    weights = [];

    const weightRanges = font.weight.split(";");

    weightRanges.forEach((range) => {

      let italics = false;

       if(range.includes("i")) {
        italics = true;
        range = range.slice(0, -1);
      }

      const weightRange = range.split("..");

      for (let weight = parseInt(weightRange[0]); weight <= parseInt(weightRange[1]); weight += 100) {
        if(italics) {
          weights.push(weight + "i");
        } else {
          weights.push(weight.toString());
        }
      }
    });

    weights.sort((a ,b) => { 
      return a - b;
    });

  } else {
    weights = font.weight.split(";");
  }

  return weights.map((weight) => {
    if(!weight.includes("i")) {
      return <li key={weight} className="flex gap-1 items-start" style={{fontWeight: weight}}><div className="text-xs leading-none pt-px">{weight}</div><div>{getFontLabel(parseInt(weight))}</div>{getItalics(weight, weights)}</li>
    } else {
      return null;
    }
  })
}

export default FontWeights;