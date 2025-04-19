import styles from "../styles/description.module.scss";
interface Props {
  title: string;
  description: string[];
  type: string;
  detaljer: Record<string, string>;
}

const Description = ({ title, description, type, detaljer }: Props) => {
  return (
    <section>
      <section className={styles.description}>
        {description.map((el) => (
          <p>{el}</p>
        ))}
      </section>
      <section className={styles.detailsSection}>
        {Object.entries(detaljer).map(([detalj, tekst]) => {
          return (
            <div className={styles.detalj}>
              <b>{detalj}:</b>
              <p>{tekst}</p>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default Description;
