import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && classes.loading_spinner__overlay}`}>
      <div className={classes.lds_dual_ring}></div>
    </div>
  );
};

export default LoadingSpinner;
