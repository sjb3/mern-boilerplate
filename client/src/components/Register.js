import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../_actions/user_actions";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    // console.log("dataToSubmit", dataToSubmit);

    if (this.isFormvalid()) {
      this.setState({ errors: [] });
      this.props.dispatch(registerUser(dataToSubmit)).then((response) => {
        // console.log("response >>>", response);
        if (response.payload.success) {
          this.props.history.push("/login");
        } else {
          this.setState({
            errors: this.state.errors.concat("Sending data to DB failed"),
          });
        }
      }).catch((err) => {
        this.setState({ errors: this.state.errors.concat(err) });
      });
    } else {
      console.error("line 48");
    }
  };

  isFormEmpty = ({ lastname, firstname, email, password, confirmPassword }) => {
    return (
      !lastname.length ||
      !firstname.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    );
  };

  isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  isFormvalid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Please fill out the form" };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is not valid" };
      this.setState({ errors: errors.concat(error) });
    } else {
      return true;
    }
  };

  displayErrors = (errors) =>
    errors.map((err, i) => (
      <div key={i}>{err}</div>
    ));

  render() {
    return (
      <div className="container">
        <h2>Register</h2>
        <div className="col s3">
          <Link to="/login">
            Already registered?
          </Link>
        </div>
        <div className="row">
          <form className="col s12" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Enter your first name"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
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
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Confirm your password"
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
                  Create
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

// function mapStateToProps(state) {
//   return {
//     user: state.user,
//   };
// }

export default connect()(Register);
