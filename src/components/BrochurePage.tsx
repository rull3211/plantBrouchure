import Description from "./Description";
import Picture from "./Picture";
import styles from "../styles/brochurePage.module.scss";
import { Plant } from "../utils/plantMapper";
const BrochurePage = ({ plant }: { plant: Plant }) => {
  return (
    <section className={styles.page}>
      <section>
        <h2>{plant.title}</h2>
        <p>{plant.type}</p>
      </section>
      <section className={styles.content}>
        <Description
          description={plant.description}
          detaljer={plant.details}
        ></Description>
        <Picture
          imageTitle={plant.title}
          imageSrc={plant.imageSrc}
          extraInfo={plant.type}
        ></Picture>
      </section>
    </section>
  );
};

export default BrochurePage;
