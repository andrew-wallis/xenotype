import { useEffect, useState, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import FontSample from "./FontSample";
import BackIcon from "../../../assets/Back.svg"
import 'swiper/css';

function FontHeader() {

  // React Hooks

  const {setActiveFont} = useContext(AppContext);
  const {alternatives, pairings, primaryFont, setPrimaryFont, secondaryFont, setSecondaryFont} = useContext(FontContext);

  const [alternativesIndex, setAlternativesIndex] = useState(0);
  const [pairingsIndex, setPairingsIndex] = useState(0);

  const [sliderAlts, setSliderAlts] = useState([]);
  const [sliderPairs, setSlidePairs] = useState([]);

  const [isMobile, setIsMobile] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Refs for the swipers
  const alternativesSwiperRef = useRef(null);
  const pairingsSwiperRef = useRef(null);

  useEffect(() => {
    const index = alternatives.indexOf(primaryFont);
    setAlternativesIndex(index);
    setSliderAlts(alternatives.slice(0, index + 4));
  }, [alternatives, primaryFont]);

  useEffect(() => {
    const index = pairings.indexOf(secondaryFont);
    setPairingsIndex(index + 1);
    setSlidePairs(pairings.slice(0, index + 4));
  }, [pairings, secondaryFont]);

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

  useEffect(() => {
    if (isInteracting) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    }
  }, [isInteracting])

  // Functions

  // Action for clicking primary font - changes alts index
  const choosePrimaryFont = (font) => {
/*     if(font !== context.primaryFont) {
      setPrimaryFont(font);
      setAlternativesIndex(sliderAlts.indexOf(font));
    } */
    setAlternativesIndex(sliderAlts.indexOf(font));
  }

  // Action for clicking secondary font - changes pairing index
  const chooseSecondaryFont = (font) => {
/*     if(font !== context.secondaryFont) {
      setSecondaryFont(font);
      setPairingsIndex(sliderPairs.indexOf(font));
    } */
    setPairingsIndex(sliderPairs.indexOf(font) + 1);
  }

  // Handle alts slider ??
  const handleSlideChangeAlternatives = (swiper) => {
    if(sliderAlts.length > 0) {
      setPrimaryFont(sliderAlts[swiper.activeIndex]);
    }
  }

  // Handle pairings slider ??
  const handleSlideChangePairings = (swiper) => {
    if(sliderPairs.length > 0) {
      if(swiper.activeIndex > 0) {
        setSecondaryFont(sliderPairs[swiper.activeIndex - 1]);
      } else {
        setSecondaryFont({});
      }
    }
  }

  // Add to alts array if you reach the end
  const handleReachEndAlternatives = () => {
    setSliderAlts((prev) => [
      ...prev,
      ...alternatives.slice(prev.length, prev.length + 4)
    ]);
  }

  // Add to the pairings array if you reach the end
  const handleReachEndPairings = () => {
    setSlidePairs((prev) => [
      ...prev,
      ...pairings.slice(prev.length, prev.length + 4)
    ]);
  }

  const handleInteractionStart = () => {
    setIsInteracting(true);
  }

  const handleInteractionEnd = () => {
    setIsInteracting(false);
  }

  const handleNoPair = (e) => {
    e.preventDefault;
    setPairingsIndex(0);
  }

  const backButton = (e) => {
    e.preventDefault();
    setActiveFont({});
  }

  return (
    <header className="sticky z-50 top-0 inset-x-0 bg-dark-bg">
      <div className="grid grid-cols-4 gap-2 p-4 border-b border-b-dark-text/20">
        <div className="text-xs leading-4 font-medium tracking-wider uppercase flex gap-2 items-center">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.6" d="M5 1L1 5L5 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
          <a href="#" onClick={(e) => backButton(e)}>Back</a>
        </div>
        <h1 className="col-span-2 text-center uppercase tracking-wider font-semibold text-sm leading-4">
          UXType
        </h1>
      </div>
      <div className="overflow-y-auto">
        <div className="py-4 border-b border-b-dark-text/10">
          <Swiper 
            slidesPerView={isMobile ? 3 : 3} 
            spaceBetween={isMobile ? 16 : 72} 
            centeredSlides={true} 
            grabCursor={true} 
            onReachEnd={handleReachEndAlternatives}
            onSlideChange={handleSlideChangeAlternatives}
            onSwiper={(swiper) => (alternativesSwiperRef.current = swiper)}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onMouseDown={handleInteractionStart}
            onMouseEnd={handleInteractionEnd}
          >
            {sliderAlts.map((font, index) => (
              <SwiperSlide key={index}>
                <FontSample font={font} activeFont={primaryFont} chooseFont={choosePrimaryFont} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="py-4 border-b border-b-dark-text/10">
          <div className="relative">
            <Swiper 
              slidesPerView={isMobile ? 3 : 3} 
              spaceBetween={isMobile ? 16 : 72} 
              centeredSlides={true} 
              grabCursor={true} 
              allowTouchMove={true}
              onReachEnd={handleReachEndPairings}
              onSlideChange={handleSlideChangePairings}
              onSwiper={(swiper) => (pairingsSwiperRef.current = swiper)}
              onTouchStart={handleInteractionStart}
              onTouchEnd={handleInteractionEnd}
              onMouseDown={handleInteractionStart}
              onMouseEnd={handleInteractionEnd}
            >
              <SwiperSlide key={"nopair"}>
                <a href="#" onClick={(e) => handleNoPair(e)} className="block text-xs leading-5 uppercase tracking-wider font-semibold opacity-60">
                  Don’t Pair
                </a>
              </SwiperSlide>
              {sliderPairs.map((font, index) => (
                <SwiperSlide key={index}>
                  <FontSample font={font} activeFont={secondaryFont} chooseFont={chooseSecondaryFont} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </header>
  );
}

export default FontHeader;