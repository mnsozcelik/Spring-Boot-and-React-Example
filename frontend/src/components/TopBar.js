import React from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authActions";

const TopBar = (props) => {
  const { t } = useTranslation();
  const reduxState = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));
  const { username, isLoggedIn } = reduxState;
  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(logoutSuccess())
  };
  let links = (
    <ul className="nav navbar-nav ml-auto">
      <li>
        <Link className="nav-link" to="/login">
          {t("Login")}
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/signup">
          {t("Sign Up")}
        </Link>
      </li>
      <li>
        <LanguageSelector />
      </li>
    </ul>
  );
  if (isLoggedIn) {
    links = (
      <ul className="nav navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to={"/user/" + username}>
            {username}
          </Link>
        </li>
        <li className="nav-link" onClick={onLogoutSuccess} style={{ cursor: "pointer" }}>
          {t("Logout")}
        </li>
        <li>
          <LanguageSelector />
        </li>
      </ul>
    );
  }

  return (
    <div className="container-fluid shadow rounded   bg-primary mb-2">
      <nav className=" navbar navbar-dark container navbar-expand">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="70" alt="Hoaxify Logo" />
          Hoaxify
        </Link>
        {links}
      </nav>
    </div>
  );
};

export default TopBar;
