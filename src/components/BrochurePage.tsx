import Description from "./Description";
import Picture from "./Picture";
import styles from "../styles/brochurePage.module.scss";
import { Plant } from "../utils/plantMapper";
const BrochurePage = ({ plant }: { plant: Plant }) => {
  return (
    <section className={styles.page}>
      <Description
        title={plant.title}
        description={plant.description}
        type={plant.type}
        detaljer={plant.details}
      ></Description>
      <Picture
        imageTitle={plant.title}
        imageSrc={plant.imageSrc}
        extraInfo={plant.type}
      ></Picture>
    </section>
  );
};

export default BrochurePage;
