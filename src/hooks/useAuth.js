import { useCallback, useState, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [userId, setUserId] = useState();
  const [token, setToken] = useState(false);
  const [support, setSupport] = useState("");
  const [nickname, setNickname] = useState("");
  const [stepsSkipped, setStepsSkipped] = useState("");
  const [stepsCompleted, setStepsCompleted] = useState([]);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();

  const loggedIn = useCallback(
    (
      userId,
      token,
      nickname,
      support,
      stepsSkipped,
      stepsCompleted,
      expiration
    ) => {
      setToken(token);
      setUserId(userId);
      setNickname(nickname);
      setSupport(support);
      setStepsSkipped(stepsSkipped);
      setStepsCompleted([]);
      const tokenExpirationTime =
        expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationTime(tokenExpirationTime);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token,
          userId,
          nickname,
          support,
          stepsSkipped,
          stepsCompleted,
          tokenExpirationTime: tokenExpirationTime?.toISOString(),
        })
      );
    },
    []
  );

  const loggedOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    setSupport(null);
    setNickname(null);
    setStepsSkipped(null);
    setStepsCompleted(null);
    setTokenExpirationTime(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage?.getItem("userData"));
      if (
        userData?.token &&
        new Date(userData?.tokenExpirationTime) > new Date()
      ) {
        const {
          token,
          userId,
          nickname,
          support,
          stepsSkipped,
          stepsCompleted,
          tokenExpirationTime,
        } = userData;
        loggedIn(
          userId,
          token,
          nickname,
          support,
          stepsSkipped,
          stepsCompleted,
          new Date(tokenExpirationTime)
        );
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      console.log(tokenExpirationTime);
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(loggedOut, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, loggedOut, tokenExpirationTime]);

  return {
    token,
    loggedIn,
    loggedOut,
    userId,
    nickname,
    support,
    stepsSkipped,
    stepsCompleted,
    tokenExpirationTime,
  };
};
