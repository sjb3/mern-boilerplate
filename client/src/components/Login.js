import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../_actions/user_actions";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(dataToSubmit);

    if (this.isValidForm(this.state)) {
      this.setState({ errors: [] });
      // You can use axios instead utilizing redux
      this.props.dispatch(loginUser(dataToSubmit))
        .then((response) => {
          if (response.payload.loginSuccess === true) {
            this.props.history.push("/");
          } else {
            this.setState({
              errors: this.state.errors.concat(
                "Failed to log in, invalid email and/or password",
              ),
            });
          }
        })
        .catch((err) => console.error(err));
    } else {
      this.setState({
        errors: this.state.errors.concat(
          "Invalid form: both email and password required to log in!",
        ),
      });
    }
    this.setState({ email: "", password: "" });
  };

  isValidForm = ({ email, password }) => email && password;

  displayErrors = (errors) =>
    errors.map((err, i) => (
      <p key={i}>{err}</p>
    ));

  render() {
    return (
      <div className="container">
        <h2>Log In</h2>
        <div className="col s3">
          <Link to="/register">
            Not registered?
          </Link>
        </div>
        <div className="row">
          <form className="col s12" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            {this.state.errors.length > 0 &&
              (<div style={{ background: "pink" }}>
                {this.displayErrors(this.state.errors)}
              </div>)}
            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  Log in
                  <i className="material-icons right">add</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
