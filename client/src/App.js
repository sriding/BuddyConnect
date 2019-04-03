import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//Actions
import { authLogin, authSignUp, authCheck, authLogout } from "./actions/auth";

//Components
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./components/Private_Route/Private_Route";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends Component {
  componentDidMount = () => {
    this.props.authCheck();
  };

  state = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    this.props.onLoginSubmit(this.state.email, this.state.password);
  };

  handleSignUpSubmit = event => {
    event.preventDefault();
    this.props.onSignUpSubmit(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.confirm_password
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            path="/"
            render={props => (
              <Header authLogout={this.props.authLogout} {...props} />
            )}
          />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/sign-up"
            render={props => (
              <SignUp
                handleSignUpSubmit={this.handleSignUpSubmit}
                handleChange={this.handleChange}
                name={this.state.name}
                email={this.state.email}
                password={this.state.password}
                confirm_password={this.state.confirm_password}
                authCheck={this.props.authCheck}
                authenticated={this.props.authenticated}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                handleLoginSubmit={this.handleLoginSubmit}
                handleChange={this.handleChange}
                email={this.state.email}
                password={this.state.password}
                authCheck={this.props.authCheck}
                authenticated={this.props.authenticated}
                {...props}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  email: state.authReducer.email,
  authenticated: state.authReducer.authenticated
});

const mapDispatchToProps = dispatch => ({
  onSignUpSubmit: (name, email, password, confirm_password) => {
    dispatch(authSignUp(name, email, password, confirm_password));
  },
  onLoginSubmit: (email, password) => {
    dispatch(authLogin(email, password));
  },
  authCheck: () => {
    dispatch(authCheck());
  },
  authLogout: () => {
    dispatch(authLogout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
