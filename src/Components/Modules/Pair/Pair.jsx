import { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../../../App";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import PairSample from "./PairSample";
import CTA from "../../Elements/CTA";

function Pair() {

  // React Hooks

  const context = useContext(AppContext);

  const [alternativesIndex, setAlternativesIndex] = useState(0);
  const [pairingsIndex, setPairingsIndex] = useState(0);

  const [alternatives, setAlternatives] = useState([]);
  const [pairings, setPairings] = useState([]);

  const alternativesSwiperRef = useRef(null);
  const pairingsSwiperRef = useRef(null);

  useEffect(() => {
    const index = context.allAlternatives.indexOf(context.primaryFont);
    setAlternativesIndex(index);
    setAlternatives(context.allAlternatives.slice(0, index + 4));
  }, [context.allAlternatives]);

  useEffect(() => {
    const index = context.allPairings.indexOf(context.secondaryFont);
    setPairingsIndex(index);
    setPairings(context.allPairings.slice(0, index + 4));
  }, [context.allPairings]);

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
    if(font !== context.primaryFont) {
      context.setPrimaryFont(font);
      setAlternativesIndex(alternatives.indexOf(font));
    } else {
      if(context.chosenFont === font) {
        testPairing();
      } else {
        context.setChosenFont(font);
      }
    }
  }

  const chooseSecondaryFont = (font) => {
    if(font !== context.secondaryFont) {
      context.setSecondaryFont(font);
      setPairingsIndex(pairings.indexOf(font));
    } else {
      context.setChosenFont(font);
    }
  }

  function testPairing() {
    context.setPairing(true);
    context.changeModule("Test");
  }

  function skipPairing() {
    context.setPairing(false);
    context.changeModule("Test");
  }

  function handleSlideChangeAlternatives(swiper) {
    if(alternatives.length > 0) {
      context.setPrimaryFont(alternatives[swiper.activeIndex]);
    }
  }

  function handleSlideChangePairings(swiper) {
    if(pairings.length > 0) {
      context.setSecondaryFont(pairings[swiper.activeIndex]);
    }
  }

  function handleReachEndAlternatives() {
    setAlternatives((prev) => [
      ...prev,
      ...context.allAlternatives.slice(prev.length, prev.length + 4)
    ]);
  }

  function handleReachEndPairings() {
    setPairings((prev) => [
      ...prev,
      ...context.allPairings.slice(prev.length, prev.length + 4)
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
              <PairSample font={font} activeFont={context.primaryFont} sampleText={context.sampleText} chooseFont={choosePrimaryFont} />
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