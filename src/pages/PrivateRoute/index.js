import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const PrivateRoute = (props) => {
  const { children } = props;
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to={"/auth"} />;
};

export default PrivateRoute;
