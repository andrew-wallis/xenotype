import { useEffect, useState, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../../../App";
import PairSample from "./PairSample";
import CTA from "../../Elements/CTA";
import Icon from "../../Elements/Icon";
import 'swiper/css';

function Pair({setPrimaryFont, setSecondaryFont, alternatives, pairings, handlePair, handleSwap}) {

  // React Hooks

  const context = useContext(AppContext);

  const [alternativesIndex, setAlternativesIndex] = useState(0);
  const [pairingsIndex, setPairingsIndex] = useState(0);

  const [sliderAlts, setSliderAlts] = useState([]);
  const [sliderPairs, setSlidePairs] = useState([]);

  const [pair, setPair] = useState(context.pairing);
  const [swap, setSwap] = useState(false);

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

  const testPairing = () => {
    handlePair(pair);
  }

  const handleSlideChangeAlternatives = (swiper) => {
    if(sliderAlts.length > 0) {
      setPrimaryFont(sliderAlts[swiper.activeIndex]);
    }
  }

  const handleSlideChangePairings = (swiper) => {
    if(sliderPairs.length > 0 && pair) {
      setSecondaryFont(sliderPairs[swiper.activeIndex]);
    }
  }

  const handleReachEndAlternatives = () => {
    setSliderAlts((prev) => [
      ...prev,
      ...alternatives.slice(prev.length, prev.length + 4)
    ]);
  }

  const handleReachEndPairings = () => {
    setSlidePairs((prev) => [
      ...prev,
      ...pairings.slice(prev.length, prev.length + 4)
    ]);
  }

  const handlePairToggle = () => {
    setPair(!pair);
  }

  const handleSwapButton = () => {
    handleSwap();
    setSwap(!swap);
  }

  return (
    <div className="overflow-y-auto">
      <div className="">
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
      <div className="my-9 flex justify-center">
          <div className="max-w-[calc((100%_-_9rem)_/_3)]  w-full">
            <div className="flex gap-1">
              {pair ? 
              <>
                <Icon icon="Pair" label="Don't Pair" callback={handlePairToggle} />
                <Icon icon="Swap" label="Swap" callback={handleSwapButton} rotate={swap} />
              </>
              :
                <Icon icon="Unpair" label="Pair" callback={handlePairToggle} />
              }
            </div>
          </div>
        </div>
      <div className="mb-12">
        <div className="relative">
          <Swiper 
            slidesPerView={isMobile ? 2 : 3} 
            spaceBetween={isMobile ? 16 : 72} 
            centeredSlides={true} 
            grabCursor={true} 
            allowTouchMove={true}
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
          {!pair && <div className="absolute inset-0 bg-white opacity-80 z-10"></div>}
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <CTA callback={testPairing}>Test</CTA>
      </div>
      <div className="flex justify-center">
      </div>
    </div>
  );
}

export default Pair;