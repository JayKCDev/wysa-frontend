import { Link } from "react-router-dom";
import classes from "./Support.module.scss";
import { supportStyles } from "../../utils/constants";
import LoadingSpinner from "../../components/LoadingSpinner";

const Support = (props) => {
  const { support, setSupport, updateStage, isLoading, submitFormHandler } =
    props;

  const handleClick = (supportStyle) => {
    setSupport(supportStyle);
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className={classes.supportDiv}>
        <h4 className={classes.pageTitle}>Adding to your space...</h4>

        <p className={classes.pageDesc}>
          Choose a style which works the best for you
        </p>

        <div className={classes.supportStylesGrid}>
          {supportStyles.map((style, index) => {
            const { name, description } = style;
            return (
              <div
                key={index}
                onClick={() => handleClick(name)}
                className={
                  support === name
                    ? `${classes.selectedSupportStyle}`
                    : `${classes.supportStyle}`
                }
              >
                <p className={classes.supportName}>{name}</p>
                <p className={classes.supportDesc}>{description}</p>
              </div>
            );
          })}
        </div>

        <div className={classes.actionButtons}>
          <Link
            onClick={() => updateStage("previous")}
            className={classes.prevButton}
          >
            Back
          </Link>
          <button
            type="submit"
            onClick={submitFormHandler}
            className={classes.submitButton}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Support;
