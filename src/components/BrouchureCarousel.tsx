
import styles from "../styles/brochureCarousel.module.scss"; // See SCSS below
import BrochurePage from "./BrochurePage";
import { usePlantsFromCSV } from "../hooks/usePlantsFromCSV";
import { usePlantCarousel } from "../hooks/usePlantCarusel";

const BrochureCarousel = () => {
  const  { plants } = usePlantsFromCSV( "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEv0zZITBKWwg8VJkPpq9BYjujLpAWoX7baPb2eLqE0ta84COtdESHdot5mJs0NwGBoPKAtXCJ5VZF/pub?output=csv")
  const { index, handleNext, handlePrev } = usePlantCarousel(plants.length)

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.buttons}>
        <button onClick={handlePrev}>Forrige</button>
        <button onClick={handleNext}>Neste</button>
      </div>

      <div className={styles.carouselWrapper} >
        <div
          className={styles.carousel}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
         {plants.map((plant, i) => (
            <div
              className={styles.slide}
              key={i}
              style={{ flex: "0 0 100%" }}
            >
              <BrochurePage plant={plant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrochureCarousel;
