import { useEffect, useState } from "react";
import findAlternatives from "../../../utils/findAlternatives";
import findPairings from "../../../utils/findPairings";
import TestSample from "./TestSample";
import getFontStylesheet from "../../../utils/getFontStylesheet";
import getStylesheet from "./helpers/getStylesheet";
import Button from "../../Elements/Button";


function Test({fonts, sampleText, activePrimaryFont, setActivePrimaryFont, activeSecondaryFont}) {

  
  // React Hooks

  const [allAlternatives, setAllAlternatives] = useState([]);
  const [allPairings, setAllPairings] = useState([]);

  const [alternativesIndex, setAlternativesIndex] = useState(null);
  const [pairingsIndex, setPairingsIndex] = useState(null);

  const [alternatives, setAlternatives] = useState([]);
  const [pairings, setPairings] = useState([]);

  const [pairing, setPairing] = useState(Object.keys(activeSecondaryFont).length !== 0 ? true : false );

  const [pairingPrimaryFont, setPairingPrimaryFont] = useState({});
  const [pairingSecondaryFont, setPairingSecondaryFont] = useState({});

  const [primaryFontStylesheet, setPrimaryFontStylesheet] = useState(null);
  const [secondaryFontStylesheet, setSecondaryFontStylesheet] = useState(null);
  

  const [styles, setStyles] = useState({});

  useEffect(() => {
   setAllAlternatives(findAlternatives(activePrimaryFont, fonts));
   setAllPairings(findPairings(activePrimaryFont, fonts)); 
  }, [activePrimaryFont]);

  useEffect(() => {
    setAlternativesIndex(0);
    setAlternatives(allAlternatives);
    setPairingPrimaryFont(activePrimaryFont);
  }, [allAlternatives]);

  useEffect(() => {
    setPairingsIndex(allPairings.indexOf(activeSecondaryFont));
    setPairings(allPairings);
    setPairingSecondaryFont(activeSecondaryFont);
  }, [allPairings]);

  useEffect(() => {
    if(Object.keys(pairingPrimaryFont).length !== 0) {
      setPrimaryFontStylesheet(getFontStylesheet(pairingPrimaryFont, ["rg"]));
    }

    if(pairing && Object.keys(pairingSecondaryFont).length !== 0) {
      setSecondaryFontStylesheet(getFontStylesheet(pairingSecondaryFont, ["rg"]));
    } else {
      setSecondaryFontStylesheet("nostyle");
    }
  }, [pairingPrimaryFont, pairingSecondaryFont]);

  useEffect(() => {
    if(primaryFontStylesheet && secondaryFontStylesheet) {
      setStyles(getStylesheet(pairingPrimaryFont, pairingSecondaryFont));
    }
  }, [primaryFontStylesheet, secondaryFontStylesheet]);

  console.log(primaryFontStylesheet, secondaryFontStylesheet);

  const choosePrimaryFont = (font) => {
    if(font !== pairingPrimaryFont) {
      setPairingPrimaryFont(font);
      setAlternativesIndex(alternatives.indexOf(font));
    } else {
      setActivePrimaryFont(font); 
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== pairingSecondaryFont) {
      setPairingSecondaryFont(font);
      setPairingsIndex(pairings.indexOf(font));
    } else {
      setActivePrimaryFont(font);
    }
  }

  const handleFindPairings = () => {
    setPairingSecondaryFont(allPairings[0]);
  }


  return (
    <div className="">
      <div className="max-w-[68rem] mx-auto">
        <style>
          @import url('{primaryFontStylesheet}')
          @import url('{secondaryFontStylesheet}')
        </style>
        <div className="flex">
          <aside className="w-64 mr-16">
            <div className="mb-12">
              {alternatives.map((font, index) => (
                <TestSample key={index} font={font} activeFont={pairingPrimaryFont} sampleText={sampleText} chooseFont={choosePrimaryFont} />
              ))}
            </div>
            <div className="mb-12">
              {Object.keys(pairingSecondaryFont).length !== 0 && pairings.map((font, index) => (
                <TestSample key={index} font={font} activeFont={pairingSecondaryFont} sampleText={sampleText} chooseFont={chooseSecondaryFont} />
              ))}
              {Object.keys(pairingSecondaryFont).length === 0 && 
                <Button callback={handleFindPairings}>Find Pairings</Button>
              }
            </div>
          </aside>
          <main className="flex-1">
            <div className="max-w-prose">
              <h1 style={{ ...styles.h1}} className="mb-12 font-semibold">The Art and Science of Web and Software Design</h1>
              <p style={{ ...styles.p}} className="my-6">Designing intuitive and engaging web and software interfaces requires a unique blend of creativity and analytical thinking. A designer must ensure that every pixel and element is aligned perfectly, creating a harmonious visual experience. Quick feedback loops, zigzag patterns in user testing, and the ability to adapt to new challenges are essential. The ultimate goal is to craft an interface that enables users to accomplish tasks efficiently and enjoyably, whether they're inputting data in a web form or navigating through complex software features. Understanding user behavior is crucial, as is the ability to quickly iterate on designs based on feedback and testing.</p>
              <h2 style={{ ...styles.h2}} className="mt-12 mb-9 font-semibold">Balancing Aesthetics and Functionality</h2>
              <p style={{ ...styles.p}} className="my-6">In the realm of web and software design, striking the perfect balance between aesthetics and functionality is imperative. An interface that is visually appealing can significantly enhance the user experience, yet it must also function seamlessly across different devices and screen sizes. Designers often utilize a mix of fonts, color palettes, and graphical elements to create a distinctive look, while ensuring that every element serves a purpose. Features like responsive design, keyboard shortcuts, and accessible navigation are integral, allowing users to interact with the software in a way that feels natural and intuitive.</p>
              <h3 style={{ ...styles.h3}} className="mt-9 mb-6 font-semibold">Future Trends and Innovations</h3>
              <p style={{ ...styles.p}} className="my-6">Looking ahead, the landscape of web and software design is set to evolve dramatically with the advent of new technologies and methodologies. Innovations such as artificial intelligence, augmented reality, and quantum computing are poised to revolutionize how designers approach their craft. In this new paradigm, quick prototyping and iterative testing will become even more critical. Moreover, designers will need to stay adept with numerical analysis tools to measure user engagement and performance metrics accurately. Embracing these trends will not only enhance the designer's toolkit but also elevate the user experience to new heights, making each interaction more engaging and effective.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Test;