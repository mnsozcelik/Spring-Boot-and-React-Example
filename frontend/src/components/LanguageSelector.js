import React from "react";
import { withTranslation } from "react-i18next";
import { changeLanguage } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  return (
    <div className="container">
      <img
        src="https://www.countryflags.io/tr/flat/32.png"
        alt="Tukish Flag"
        onClick={() => onChangeLanguage("tr")}
        style={{ cursor: "pointer" }}
      />
      <img
        src="https://www.countryflags.io/us/flat/32.png"
        alt="American Flag"
        onClick={() => onChangeLanguage("en")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default withTranslation()(LanguageSelector);
