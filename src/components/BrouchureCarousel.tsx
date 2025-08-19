
import styles from "../styles/brochureCarousel.module.scss"; // See SCSS below
import BrochurePage from "./BrochurePage";
import { usePlantsFromCSV } from "../hooks/usePlantsFromCSV";
import { usePlantCarousel } from "../hooks/usePlantCarusel";
import { useRef } from "react";
import { NextButton, PrevButton } from "./Button";
import buttonStyles from "../styles/buttons.module.scss"
import { useSwipeable } from "react-swipeable";

const BrochureCarousel = () => {
  const { plants } = usePlantsFromCSV(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEv0zZITBKWwg8VJkPpq9BYjujLpAWoX7baPb2eLqE0ta84COtdESHdot5mJs0NwGBoPKAtXCJ5VZF/pub?output=csv"
  );
  const {handleNext, handlePrev,  transitionSpeed, handleTransitionEnd, isTransitioning, position} =  usePlantCarousel(plants.length)
  const firstRef = useRef<HTMLDivElement | null>(null);
  const firstRefClone = useRef<HTMLDivElement | null>(null);
  const lastRef = useRef<HTMLDivElement | null>(null);
  const lastRefClone = useRef<HTMLDivElement | null>(null);
  const svipeHandler = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });
  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.carouselWrapper}>
        <div
          className={styles.carousel}
          {...svipeHandler}
          style={{
            transform: `translateX(-${position * 100}%)`,
            transition: isTransitioning
              ? `transform ${transitionSpeed}s ease`
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {/* Clone last slide */}
          <div ref={lastRefClone} className={styles.slide}>
            <BrochurePage plant={plants[plants.length-1]} />
          </div>

          {/* Real slides */}
          {plants.map((plant, i) => {
            let refToUse = null
            if(i === 0)refToUse = firstRef
            else if(i === plants.length -1) refToUse = lastRef
            return(
            
            <div  className={styles.slide} ref={refToUse} onScroll={
              (e)=>{
                const scrollTop = e.currentTarget.scrollTop;
                if(i === 0 && firstRefClone.current != null)firstRefClone.current.scrollTop= scrollTop
                else if(i === plants.length -1 && lastRefClone.current != null)lastRefClone.current.scrollTop= scrollTop
            }} key={i}>
              <BrochurePage plant={plant} />
            </div>
          )})}

          {/* Clone first slide */}
          <div ref={firstRefClone}  className={styles.slide}>
            <BrochurePage plant={plants[0]} />
          </div>
        </div>
      </div>
      <div className={buttonStyles.emblaControls}>
        <div className={buttonStyles.emblaButtons}>
          <NextButton onClick={handlePrev}/>
          <PrevButton onClick={handleNext}/>
       </div>
      </div>
    </div>
  );
};

export default BrochureCarousel;