import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/authContext";
import { Auth, Home, ThankYou, PrivateRoute } from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  //prettier-ignore
  const {token,loggedIn,loggedOut,userId,nickname,support,stepsSkipped,stepsCompleted } = useAuth();

  return (
    <>
      <Router>
        <AuthContext.Provider
          value={{
            token: token,
            login: loggedIn,
            logout: loggedOut,
            isLoggedIn: !!token,
            userId: userId,
            nickname: nickname,
            support: support,
            stepsSkipped: stepsSkipped,
            stepsCompleted: stepsCompleted,
          }}
        >
          <>
            <Navbar />
            <Routes>
              <Route
                path={"/"}
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path={"/auth"} element={<Auth />} />
              <Route
                path={"/thank-you"}
                element={
                  <PrivateRoute>
                    <ThankYou />
                  </PrivateRoute>
                }
              />
            </Routes>
          </>
        </AuthContext.Provider>
      </Router>
    </>
  );
};

export default App;
