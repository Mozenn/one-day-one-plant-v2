import styles from "./Spinner.module.scss";

const Spinner = ({ styleOverride }: { styleOverride?: string }) => {
  return (
    <div className={`${styles.ldsSpinner} ${styleOverride}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
