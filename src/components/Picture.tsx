import styles from "../styles/picture.module.scss";
interface Props {
  imageSrc: string;
  imageTitle: string;
  extraInfo?: string;
}

const Picture = ({ imageSrc, imageTitle, extraInfo }: Props) => {
  return (
    <section className={styles.pictureSection}>
      <img src={imageSrc} />
    </section>
  );
};

export default Picture;
