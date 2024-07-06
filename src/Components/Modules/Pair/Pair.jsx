import { useEffect, useState, useRef } from "react";
import findAlternatives from "../../../utils/findAlternatives";
import findPairings from "../../../utils/findPairings";
import PairSample from "./PairSample";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';


function Pair({fonts, sampleText, changeModule, activePrimaryFont, setActivePrimaryFont, activeSecondaryFont, setActiveSecondaryFont}) {


  // React Hooks

  const [allAlternatives, setAllAlternatives] = useState([]);
  const [allPairings, setAllPairings] = useState([]);

  const [alternativesIndex, setAlternativesIndex] = useState(null);
  const [pairingsIndex, setPairingsIndex] = useState(null);

  const [alternatives, setAlternatives] = useState([]);
  const [pairings, setPairings] = useState([]);

  const alternativesSwiperRef = useRef(null);
  const pairingsSwiperRef = useRef(null);
  
  const [pairingPrimaryFont, setPairingPrimaryFont] = useState({});
  const [pairingSecondaryFont, setPairingSecondaryFont] = useState({});

  useEffect(() => {
    setAllAlternatives(findAlternatives(activePrimaryFont, fonts));
    setAllPairings(findPairings(activePrimaryFont, fonts));
  }, [activePrimaryFont]);

  useEffect(() => {
    setAlternativesIndex(0);
    setAlternatives(allAlternatives.slice(0, alternativesIndex + 4));
    setPairingPrimaryFont(activePrimaryFont);
  }, [allAlternatives]);

  useEffect(() => {

    const isSecondaryFontActive = (Object.keys(activeSecondaryFont).length > 0 && allPairings.includes(activeSecondaryFont)) ? true : false;

    setPairingsIndex(isSecondaryFontActive ? allPairings.indexOf(activeSecondaryFont) : 0);
    setPairings(allPairings.slice(0, pairingsIndex + 4));
    setPairingSecondaryFont(isSecondaryFontActive ? activeSecondaryFont : allPairings[0]);
  }, [allPairings]);

  useEffect(() => {
    if(alternativesSwiperRef.current) {
      alternativesSwiperRef.current.slideTo(alternativesIndex);
    }
  }, [alternativesIndex]);

  useEffect(() => {
    if(pairingsSwiperRef.current) {
      pairingsSwiperRef.current.slideTo(pairingsIndex);
    }
  }, [pairingsIndex]);


  // Functions

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


  // Local functions

  function handleBack(e) {
    e.preventDefault();
    changeModule("Choose");
  }

  function testPairing(e) {
    e.preventDefault();
    setActivePrimaryFont(pairingPrimaryFont);
    setActiveSecondaryFont(pairingSecondaryFont);
    changeModule("Test");
  }

  function handleReachEndAlternatives() {
    setAlternatives((prev) => [
      ...prev,
      ...allAlternatives.slice(prev.length, prev.length + 4)
    ]);
  }

  function handleReachEndPairings() {
    setPairings((prev) => [
      ...prev,
      ...allPairings.slice(prev.length, prev.length + 4)
    ]);
  }

  return (
    <>
      <header className="my-16 relative">
        <a className="absolute uppercase tracking-wider font-bold text-sm leading-5" href="#" onClick={(e) => handleBack(e)}>Back</a>
        <h1 className="uppercase tracking-wider font-black text-center leading-5">Pair</h1>
      </header>
      <div className="mb-12">
        <Swiper 
          slidesPerView={2} 
          spaceBetween={72} 
          centeredSlides={true} 
          grabCursor={true} 
          onReachEnd={handleReachEndAlternatives}
          onSwiper={(swiper) => (alternativesSwiperRef.current = swiper)}
        >
          {alternatives.map((font, index) => (
            <SwiperSlide key={index}>
              <PairSample font={font} activeFont={pairingPrimaryFont} sampleText={sampleText} chooseFont={choosePrimaryFont} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mb-16">
        <Swiper 
          slidesPerView={2} 
          spaceBetween={72} 
          centeredSlides={true} 
          grabCursor={true} 
          onReachEnd={handleReachEndPairings}
          onSwiper={(swiper) => (pairingsSwiperRef.current = swiper)}
        >
          {pairings.map((font, index) => (
            <SwiperSlide key={index}>
              <PairSample font={font} activeFont={pairingSecondaryFont} sampleText={sampleText} chooseFont={chooseSecondaryFont} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center">
        <a onClick={(e) => testPairing(e)} className="inline-block rounded-full py-2.5 px-5 bg-gray-100 uppercase tracking-wider text-sm leading-5 font-bold" href="#">Test This Pairing</a>
      </div>
    </>
  );
}

export default Pair;