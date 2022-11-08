import classes from "./Auth.module.scss";
import Card from "../../components/Card";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/ErrorModal";
import { AuthContext } from "../../context/authContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useHttpRequestClient } from "../../hooks/useHttpRequestClient";

const initialValues = {
  email: "",
  password: "",
};

const Auth = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const isAuthenticated = useContext(AuthContext);
  const [values, setValues] = useState(initialValues);
  const [isLoginMode, setIsLoginMode] = useState(true);
  //prettier-ignore
  const { isLoading, error, errorHandler, sendHttpRequest } = useHttpRequestClient();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (values.email && values.password) {
      setIsValid(true);
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setValues({
        ...values,
      });
    } else {
      setValues({
        ...values,
      });
    }
    setIsLoginMode((currentMode) => !currentMode);
  };

  const submitAuthHandler = async (e) => {
    e.preventDefault();
    let requestBody = {
      email: values.email,
      password: values.password,
    };
    if (isLoginMode) {
      try {
        const responseData = await sendHttpRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify(requestBody)
        );
        const { token } = responseData;
        //prettier-ignore
        const { id, nickname, support, stepsSkipped, stepsCompleted } = responseData?.user;
        isAuthenticated.login(
          id,
          token,
          nickname,
          support,
          stepsSkipped,
          stepsCompleted
        );
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const responseData = await sendHttpRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify(requestBody)
        );
        const { token } = responseData;
        //prettier-ignore
        const { id, nickname, support, stepsSkipped, stepsCompleted } = responseData?.user;
        isAuthenticated.login(
          id,
          token,
          nickname,
          support,
          stepsSkipped,
          stepsCompleted
        );
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <ErrorModal
        error={error}
        onClear={errorHandler}
        className={classes.errorModal}
      />
      <Card className={classes.authentication}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className={classes.loginText}>
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
        <hr className={classes.loginDivider} />
        <form className={classes.loginForm}>
          <input
            type="text"
            id="email"
            name="email"
            value={values.email}
            onChange={changeHandler}
          />
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={changeHandler}
          />
        </form>
        <button
          type="submit"
          className={classes.submitButton}
          onClick={submitAuthHandler}
        >
          Submit
        </button>
        <button
          type="button"
          className={classes.switchButton}
          onClick={switchModeHandler}
        >
          {isLoginMode ? "SignUp instead" : "Login"}
        </button>
      </Card>
    </>
  );
};

export default Auth;
