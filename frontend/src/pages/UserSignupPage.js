import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { signupHandler } from "../redux/authActions";
class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  };

  onChange = async (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = "Password mismatch";
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = "Password mismatch";
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignUp = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { push } = history;
    const { username, displayName, password } = this.state;
    const body = {
      username,
      displayName,
      password,
    };
    try {
      await dispatch(signupHandler(body));
      push("/");
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center ">{this.props.t("Sign Up")}</h1>
          <Input
            name="username"
            label={this.props.t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="displayName"
            label={t("Display Name")}
            error={displayName}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label={t("Password")}
            type="password"
            error={password}
            onChange={this.onChange}
          />
          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            type="password"
            error={passwordRepeat}
            onChange={this.onChange}
          />

          <div className="text-center">
            <ButtonWithProgress
              onClick={this.onClickSignUp}
              disabled={pendingApiCall || passwordRepeat !== undefined}
              pendingApiCall={pendingApiCall}
              text={t("Sign Up")}
            />
          </div>
        </form>
      </div>
    );
  }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(
  UserSignupPageWithTranslation,
  "/api/1.0/users"
);
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(
  UserSignupPageWithApiProgressForSignupRequest,
  "/api/1.0/auth"
);

export default connect()(UserSignupPageWithApiProgressForAuthRequest);
