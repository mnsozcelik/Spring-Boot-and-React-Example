import React from "react";
import UserSignupPage from "../pages/UserSignupPage";
import UserLoginPage from "../pages/UserLoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import TopBar from "../components/TopBar";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    username: undefined,
  };

  onLoginSuccess = (username) => {
    this.setState({
      username,
      isLoggedIn: true,
    });
  };

  onLogoutSuccess = () => {
    this.setState({
      username: undefined,
      isLoggedIn: false,
    });
  };
  render() {
    const { isLoggedIn, username } = this.state;
    return (
      <div className="row">
        <Router>
          <TopBar
            username={username}
            isLoggedIn={isLoggedIn}
            onLogoutSuccess={this.onLogoutSuccess}
          />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && (
              <Route
                path="/login"
                component={(reactRouterProps) => {
                  return (
                    <UserLoginPage
                      {...reactRouterProps}
                      onLoginSuccess={this.onLoginSuccess}
                    />
                  );
                }}
              />
            )}
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
