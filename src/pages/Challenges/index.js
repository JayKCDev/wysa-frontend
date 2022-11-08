import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import classes from "./Challenges.module.scss";
import { challenges } from "../../utils/constants";
import { AuthContext } from "../../context/authContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const Challenges = (props) => {
  let { stepsSkipped } = useContext(AuthContext);
  //prettier-ignore
  const { updateStage, isLoading, allChallenges, setAllChallenges, submitFormHandler } = props;

  const handleClick = (challenge) => {
    if (allChallenges.includes(challenge)) {
      return setAllChallenges(() =>
        allChallenges.filter(
          (currentChallenge) => currentChallenge !== challenge
        )
      );
    }
    setAllChallenges((existingChallenges) => [
      ...existingChallenges,
      challenge,
    ]);
  };

  return (
    <div className={classes.challengesDiv}>
      {isLoading && <LoadingSpinner asOverlay />}
      {stepsSkipped === "Challenges" && (
        <Card className={classes.skippedCard}>
          <p>
            Woops! You missed to select the challenges while onboarding. Let's
            finish it now you're almost there
          </p>
        </Card>
      )}
      <h4 className={classes.pageTitle}>Building your space...</h4>
      <p className={classes.pageDesc}>
        Add challenges that you will like help with your space
      </p>

      <div className={classes.challengesGrid}>
        {challenges.map((challenge, index) => {
          const { name } = challenge;
          return (
            <div
              key={index}
              // id={"challenges"}
              name={name}
              value={name}
              className={
                allChallenges.includes(name)
                  ? `${classes.selectedChallenge}`
                  : `${classes.challenge}`
              }
              onClick={() => handleClick(name)}
            >
              <p className={classes.challengeName}>{name}</p>
            </div>
          );
        })}
      </div>

      <div className={classes.actionButtons}>
        {stepsSkipped !== "Challenges" && ( //prettier-ignore
          <Link
            onClick={() => updateStage("previous")}
            className={classes.prevButton}
          >
            Back
          </Link>
        )}

        {!stepsSkipped?.length && !allChallenges.length && (
          <Link
            className={classes.nextButton}
            onClick={() => updateStage("next")}
          >
            Maybe later
          </Link>
        )}

        {!allChallenges?.length &&
          stepsSkipped === "Challenges" && ( //prettier-ignore
            <Link className={classes.nextButton} to={"/thank-you"}>
              Maybe later
            </Link>
          )}

        {allChallenges?.length > 0 && ( //prettier-ignore
          <Link
            className={classes.nextButton}
            onClick={
              stepsSkipped === "Challenges"
                ? submitFormHandler
                : () => updateStage("next")
            }
          >
            That's all for now
          </Link>
        )}
      </div>
    </div>
  );
};

export default Challenges;
