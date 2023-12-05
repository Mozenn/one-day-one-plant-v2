import styles from "./Spinner.module.scss";

const Spinner = ({
  styleOverride = "ml-[50%] !mt-[20vh]",
}: {
  styleOverride?: string;
}) => {
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
