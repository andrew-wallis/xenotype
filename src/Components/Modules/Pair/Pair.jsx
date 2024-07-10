import { useEffect, useState, useRef } from "react";
import findAlternatives from "../../../utils/findAlternatives";
import findPairings from "../../../utils/findPairings";
import PairSample from "./PairSample";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import CTA from "../../Elements/CTA";


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
      if(activePrimaryFont === font) {
        testPairing();
      } else {
        setActivePrimaryFont(font); 
      }
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== pairingSecondaryFont) {
      setPairingSecondaryFont(font);
      setPairingsIndex(pairings.indexOf(font));
    } else {
      setActivePrimaryFont(font);
      setPairingSecondaryFont({});
      setPairingsIndex(null);
    }
  }

  function testPairing() {
    setActivePrimaryFont(pairingPrimaryFont);
    setActiveSecondaryFont(pairingSecondaryFont);
    changeModule("Test");
  }

  function skipPairing() {
    setActivePrimaryFont(pairingPrimaryFont);
    setActiveSecondaryFont({});
    changeModule("Test");
  }

  function handleSlideChangeAlternatives(swiper) {
    if(alternatives.length > 0) {
      setPairingPrimaryFont(alternatives[swiper.activeIndex]);
    }
  }

  function handleSlideChangePairings(swiper) {
    if(pairings.length > 0) {
      setPairingSecondaryFont(pairings[swiper.activeIndex]);
    }
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
    <div className="">
      <div className="mb-12">
        <Swiper 
          slidesPerView={2} 
          spaceBetween={72} 
          centeredSlides={true} 
          grabCursor={true} 
          onReachEnd={handleReachEndAlternatives}
          onSlideChange={handleSlideChangeAlternatives}
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
          onSlideChange={handleSlideChangePairings}
          onSwiper={(swiper) => (pairingsSwiperRef.current = swiper)}
        >
          {pairings.map((font, index) => (
            <SwiperSlide key={index}>
              <PairSample font={font} activeFont={pairingSecondaryFont} sampleText={sampleText} chooseFont={chooseSecondaryFont} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center mb-6">
        <CTA callback={testPairing}>Test This Pairing</CTA>
      </div>
      <div className="flex justify-center">
        <a href="#" className="underline font-medium uppercase tracking-wider text-sm leading-5" onClick={skipPairing}>Skip Pairing</a>
      </div>
    </div>
  );
}

export default Pair;