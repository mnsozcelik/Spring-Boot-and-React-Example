import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authActions";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const TopBar = (props) => {
  const { t } = useTranslation();
  const reduxState = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    displayName: store.displayName,
    image: store.image,
  }));

  const menuArea = useRef(null);
  const { username, isLoggedIn, displayName, image } = reduxState;

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("click", menuClickTracker);
    return () => {
      document.removeEventListener("click", menuClickTracker);
    };
  }, [isLoggedIn]);

  const menuClickTracker = (event) => {
    if (menuArea.current===null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
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
    let dropDownClass = "dropdown-menu p-0 shadow border-0";
    if (menuVisible) {
      dropDownClass += " show";
    }

    links = (
      <ul className="nav navbar-nav ml-auto">
        <li>
          <LanguageSelector className="m-1 mr-3" />
        </li>
        <li ref={menuArea} className="nav-item dropdown">
          <div
            className="d-flex"
            style={{ cursor: "pointer" }}
            onClick={() => setMenuVisible(true)}
          >
            <ProfileImageWithDefault
              image={image}
              width="32"
              height="32"
              className="rounded-circle m-auto shadow"
            />
            <span className="nav-link dropdown-toggle text-white">
              {displayName}
            </span>
          </div>
          <div className={dropDownClass}>
            <Link className="dropdown-item d-flex p-2" to={"/user/" + username} onClick={()=> setMenuVisible(false)}>
              <span className="material-icons text-primary mr-2">
                account_circle
              </span>
              {t("My Profile")}
            </Link>
            <hr className="m-0 bg-white"></hr>
            <span
              className="dropdown-item d-flex p-2"
              onClick={onLogoutSuccess}
              style={{ cursor: "pointer" }}
            >
              <span className="material-icons text-danger mr-2">logout</span>
              {t("Logout")}
            </span>
          </div>
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
