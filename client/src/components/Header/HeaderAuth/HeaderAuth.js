import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const HeaderAuth = props => {
  if (props.authenticated === true) {
    return (
      <div>
        <span
          onClick={() => {
            {
              props.getProfile(props.my_profile);
              props.history.push(`/profile/${props.my_profile}`);
            }
          }}
        >
          Profile{" "}
        </span>
        <span>
          <Link to="/login" onClick={props.authLogout}>
            Sign Out
          </Link>
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <span>
          <Link to="/login">Login </Link>
        </span>
        <span>
          <Link to="/sign-up">Sign Up</Link>
        </span>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  authenticated: state.authReducer.authenticated
});

export default connect(mapStateToProps)(HeaderAuth);
