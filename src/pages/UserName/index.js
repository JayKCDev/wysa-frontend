import { Link } from "react-router-dom";
import classes from "./UserName.module.scss";

const UserName = (props) => {
  const { isValid, nickname, setIsValid, setNickname, updateStage } = props;

  const changeHandler = (e) => {
    if (nickname === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setNickname(e.target.value);
  };

  return (
    <div className={classes.usernameDiv}>
      <h4 className={classes.pageTitle}>
        Hey! I'm <span>wysa</span>
      </h4>
      <p className={classes.pageDesc}>
        Our conversations are private & anonymous, just pick a nickname and
        we're good to go.
      </p>
      <form className={classes.userNameForm}>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={changeHandler}
        />
      </form>
      <Link
        disabled={!isValid}
        onClick={() => updateStage("next")}
        className={`${
          isValid ? `${classes.nextButton}` : `${classes.disabled_link}`
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default UserName;
