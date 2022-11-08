import { useContext } from "react";
import logo from "../../assets/logo.webp";
import classes from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const isAuthenticated = useContext(AuthContext);
  const { logout, token, isLoggedIn } = isAuthenticated;

  return (
    <header className={classes.headerStyles}>
      <div className={classes.brandingDiv}>
        <Link to="/" className={classes.appLogo}>
          <img src={logo} alt="appLogo" />
        </Link>
      </div>

      <ul className={classes.navLinks}>
        {!isLoggedIn && (
          <NavLink to={"/auth"} className={classes.navLink}>
            Login
          </NavLink>
        )}

        {isLoggedIn && (
          <NavLink onClick={logout} className={classes.navLink}>
            Logout
          </NavLink>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
