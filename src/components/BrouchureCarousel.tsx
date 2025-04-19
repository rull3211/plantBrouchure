import { useEffect, useState } from "react";
import styles from "../styles/brochureCarousel.module.scss"; // See SCSS below
import BrochurePage from "./BrochurePage";
import Papa from "papaparse";
import { mapToPlant, Plant, RawPlantData } from "../utils/plantMapper";
const BrochureCarousel = () => {
  const [index, setIndex] = useState(0);
  const [plants, setPlants] = useState<Plant[]>([]);
  useEffect(() => {
    async function fetchSheetCSV() {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEv0zZITBKWwg8VJkPpq9BYjujLpAWoX7baPb2eLqE0ta84COtdESHdot5mJs0NwGBoPKAtXCJ5VZF/pub?output=csv"
      );

      const csvText = await response.text();
      const text = Papa.parse(csvText, {
        header: true,
        complete: function (results) {
          console.log(results.data); // Array of objects
        },
      });
      // Parse CSV into array of rows
      const plantsMapped = text.data.map((el) =>
        mapToPlant(el as RawPlantData)
      );
      setPlants(plantsMapped);
    }
    fetchSheetCSV();
  }, []);
  const handleNext = () => {
    if (index === plants.length - 1) setIndex(0);
    else setIndex((prev) => Math.min(prev + 1, plants.length - 1));
  };

  const handlePrev = () => {
    if (index === 0) setIndex(plants.length - 1);
    else setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={styles.carousel}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {plants.map((plant, i) => (
          <div className={styles.slide} key={i}>
            <BrochurePage plant={plant} />
          </div>
        ))}
      </div>

      <button onClick={handlePrev} className={`${styles.arrow} ${styles.left}`}>
        ←
      </button>

      <button
        onClick={handleNext}
        className={`${styles.arrow} ${styles.right}`}
      >
        →
      </button>
    </div>
  );
};

export default BrochureCarousel;
