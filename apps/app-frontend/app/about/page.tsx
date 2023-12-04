import styles from "../../styles/About.module.scss";

const About = () => {
  return (
    <main className={styles.main} role='main'>
      <h1 className={styles.title} role='heading'>
        About
      </h1>
      <p className={styles.text}>
        One Day One Plant is a website where you grow your plant collection and
        learn about Earth flora.
      </p>
      <p className={styles.text}>
        This website is developped and maintained by{" "}
        <a href='https://gauthier-cassany.com'>Gauthier Cassany</a>.
      </p>
    </main>
  );
};

export default About;
