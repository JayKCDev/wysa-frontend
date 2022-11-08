import Support from "../Support";
import UserName from "../UserName";
import Challenges from "../Challenges";
import classes from "./Home.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttpRequestClient } from "../../hooks/useHttpRequestClient";

const Home = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [support, setSupport] = useState("");
  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { tokenExpirationTime } = useAuth();
  const [allChallenges, setAllChallenges] = useState([]);
  //prettier-ignore
  const { isLoading, sendHttpRequest } = useHttpRequestClient();
  //prettier-ignore
  const { token, login,  support: globalSupport, nickname: globalNickname} = useContext(AuthContext);

  const updateStage = (condition) => {
    if (condition === "next" && stage < 3) {
      setStage((prevStage) => {
        return prevStage + 1;
      });
    }
    if (condition === "previous" && stage > 1) {
      console.log("running");
      setStage((prevStage) => {
        return prevStage - 1;
      });
    }
    return stage;
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    let requestBody = {
      nickname: nickname ?? globalNickname,
      support: support ?? globalSupport,
      challenges: allChallenges,
    };
    if (!nickname || !support) {
      return;
    }
    if (nickname && support) {
      try {
        const response = await sendHttpRequest(
          `${process.env.REACT_APP_BACKEND_URL}/onboarding/onboard`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          JSON.stringify(requestBody)
        );
        //prettier-ignore
        const { id, nickname, support, stepsSkipped, stepsCompleted } = response?.user;
        if (stepsSkipped === "Challenges") {
          setStage(2);
        }
        if (!stepsSkipped) {
          navigate("/thank-you");
          setSupport("");
          setNickname("");
          setAllChallenges([]);
        }
        login(
          id,
          token,
          nickname,
          support,
          stepsSkipped,
          stepsCompleted,
          tokenExpirationTime
        );
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  return (
    <main className={classes.homeContainer}>
      {stage === 1 && (
        <UserName
          isValid={isValid}
          nickname={nickname}
          setIsValid={setIsValid}
          setNickname={setNickname}
          updateStage={updateStage}
        />
      )}
      {stage === 2 && (
        <Challenges
          isLoading={isLoading}
          updateStage={updateStage}
          // stepsSkipped={stepsSkipped}
          allChallenges={allChallenges}
          submitFormHandler={submitFormHandler}
          setAllChallenges={setAllChallenges}
        />
      )}
      {stage === 3 && (
        <Support
          support={support}
          isLoading={isLoading}
          setSupport={setSupport}
          updateStage={updateStage}
          submitFormHandler={submitFormHandler}
        />
      )}
    </main>
  );
};

export default Home;
