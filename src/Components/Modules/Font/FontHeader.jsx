import { useEffect, useState, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppContext } from "../../../App";
import { FontContext } from "./Font";
import FontSample from "./FontSample";
import 'swiper/css';

function FontHeader() {

  // React Hooks

  const {setActiveFont} = useContext(AppContext);
  const {alternatives, pairings, primaryFont, setPrimaryFont, secondaryFont, setSecondaryFont} = useContext(FontContext);

  // Indexes - uses
  const [alternativesIndex, setAlternativesIndex] = useState(0);
  const [pairingsIndex, setPairingsIndex] = useState(0);

  // Temporary array for storing alts
  const [sliderAlts, setSliderAlts] = useState([]);
  const [sliderPairs, setSlidePairs] = useState([]);

  // Is Mobile - needed for spacing and styling
  const [isMobile, setIsMobile] = useState(false);

  // Refs for the swipers
  const alternativesSwiperRef = useRef(null);
  const pairingsSwiperRef = useRef(null);

  // Sets the initial index for alts (probably 0)
  useEffect(() => {
    const index = alternatives.indexOf(primaryFont);
    setAlternativesIndex(index);
    setSliderAlts(alternatives.slice(0, index + 4));
  }, [alternatives, primaryFont]);

  // Sets the initial index for pairings (probably 0)
  useEffect(() => {
    const index = pairings.indexOf(secondaryFont);
    setPairingsIndex(index);
    setSlidePairs(pairings.slice(0, index + 4));
  }, [pairings, secondaryFont]);

  // Slide to alternativesIndex if index changes
  useEffect(() => {
    if(alternativesSwiperRef.current) {
      alternativesSwiperRef.current.slideTo(alternativesIndex);
    }
  }, [alternativesIndex]);

  // Slide to pairingsIndex if index changes
  useEffect(() => {
    if(pairingsSwiperRef.current) {
      pairingsSwiperRef.current.slideTo(pairingsIndex);
    }
  }, [pairingsIndex]);

  // useEffect for changing changing media
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
    setPairingsIndex(sliderPairs.indexOf(font));
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
      setSecondaryFont(sliderPairs[swiper.activeIndex]);
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

  const backButton = (e) => {
    e.preventDefault();
    setActiveFont({});
  }

  return (
    <header className="sticky z-50 top-0 inset-x-0 bg-white p-4">
      <div className="grid grid-cols-4 gap-2 pb-4">
        <div className="text-sm leading-4">
          <a href="#" onClick={(e) => backButton(e)}>Back</a>
        </div>
        <h1 className="col-span-2 text-center uppercase tracking-wider font-semibold text-sm leading-4">
          UXType
        </h1>
      </div>
      <div className="overflow-y-auto">
        <div className="py-4">
          <Swiper 
            slidesPerView={isMobile ? 3 : 3} 
            spaceBetween={isMobile ? 16 : 72} 
            centeredSlides={true} 
            grabCursor={true} 
            onReachEnd={handleReachEndAlternatives}
            onSlideChange={handleSlideChangeAlternatives}
            onSwiper={(swiper) => (alternativesSwiperRef.current = swiper)}
          >
            {sliderAlts.map((font, index) => (
              <SwiperSlide key={index}>
                <FontSample font={font} activeFont={primaryFont} chooseFont={choosePrimaryFont} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="py-4">
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
            >
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