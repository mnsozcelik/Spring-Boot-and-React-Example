import React from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { connect } from "react-redux";
import { logoutSuccess } from "../redux/authActions";

const TopBar = (props) => {
  const { t, username, isLoggedIn, onLogoutSuccess } = props;
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
        <li
          className="nav-link"
          onClick={onLogoutSuccess}
          style={{ cursor: "pointer" }}
        >
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

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutSuccess: () => dispatch(logoutSuccess()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarWithTranslation);
