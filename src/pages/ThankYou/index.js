import Card from "../../components/Card";
import classes from "./ThankYou.module.scss";

const ThankYou = () => {
  return (
    <Card className={classes.thankYouCard}>
      <h3 className={classes.thankYouText}>
        Thank you for completing the onboarding process.
      </h3>
    </Card>
  );
};

export default ThankYou;
