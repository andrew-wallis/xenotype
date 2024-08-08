import { useEffect, useState, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../../../App";
import PairSample from "./PairSample";
import CTA from "../../Elements/CTA";
import 'swiper/css';

function Pair({setPrimaryFont, setSecondaryFont, alternatives, pairings, changeModule, setPairing}) {

  // React Hooks

  const context = useContext(AppContext);

  const [alternativesIndex, setAlternativesIndex] = useState(0);
  const [pairingsIndex, setPairingsIndex] = useState(0);

  const [sliderAlts, setSliderAlts] = useState([]);
  const [sliderPairs, setSlidePairs] = useState([]);

  const [isMobile, setIsMobile] = useState(false);

  const alternativesSwiperRef = useRef(null);
  const pairingsSwiperRef = useRef(null);

  useEffect(() => {
    const index = alternatives.indexOf(context.primaryFont);
    setAlternativesIndex(index);
    setSliderAlts(alternatives.slice(0, index + 4));
  }, [alternatives]);

  useEffect(() => {
    const index = pairings.indexOf(context.secondaryFont);
    setPairingsIndex(index);
    setSlidePairs(pairings.slice(0, index + 4));
  }, [pairings, context.secondaryFont]);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    }

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, []);

  // Functions

  const choosePrimaryFont = (font) => {
    if(font !== context.primaryFont) {
      setPrimaryFont(font);
      setAlternativesIndex(sliderAlts.indexOf(font));
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== context.secondaryFont) {
      setSecondaryFont(font);
      setPairingsIndex(sliderPairs.indexOf(font));
    }
  }

  function testPairing() {
    setPairing(true);
    changeModule("Test");
  }

  function skipPairing() {
    setPairing(false);
    changeModule("Test");
  }

  function handleSlideChangeAlternatives(swiper) {
    if(sliderAlts.length > 0) {
      setPrimaryFont(sliderAlts[swiper.activeIndex]);
    }
  }

  function handleSlideChangePairings(swiper) {
    if(sliderPairs.length > 0) {
      setSecondaryFont(sliderPairs[swiper.activeIndex]);
    }
  }

  function handleReachEndAlternatives() {
    setSliderAlts((prev) => [
      ...prev,
      ...alternatives.slice(prev.length, prev.length + 4)
    ]);
  }

  function handleReachEndPairings() {
    setSlidePairs((prev) => [
      ...prev,
      ...pairings.slice(prev.length, prev.length + 4)
    ]);
  }

  return (
    <div className="">
      <div className="mb-12">
        <Swiper 
          slidesPerView={isMobile ? 2 : 3} 
          spaceBetween={isMobile ? 16 : 72} 
          centeredSlides={true} 
          grabCursor={true} 
          onReachEnd={handleReachEndAlternatives}
          onSlideChange={handleSlideChangeAlternatives}
          onSwiper={(swiper) => (alternativesSwiperRef.current = swiper)}
        >
          {sliderAlts.map((font, index) => (
            <SwiperSlide key={index}>
              <PairSample font={font} activeFont={context.primaryFont} sampleText={context.sampleText} chooseFont={choosePrimaryFont} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mb-12">
        <Swiper 
          slidesPerView={isMobile ? 2 : 3} 
          spaceBetween={isMobile ? 16 : 72} 
          centeredSlides={true} 
          grabCursor={true} 
          onReachEnd={handleReachEndPairings}
          onSlideChange={handleSlideChangePairings}
          onSwiper={(swiper) => (pairingsSwiperRef.current = swiper)}
        >
          {sliderPairs.map((font, index) => (
            <SwiperSlide key={index}>
              <PairSample font={font} activeFont={context.secondaryFont} sampleText={context.sampleText} chooseFont={chooseSecondaryFont} />
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