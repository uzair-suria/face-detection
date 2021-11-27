import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }
  /*
          ============Form handlers============
*/
  onEmailChange = (e) => {
    this.setState({ signInEmail: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ signInPassword: e.target.value });
  };
  onSubmitSignIn = () => {
    fetch("https://uas-face-detection-app.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };
  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="center">
        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
          <main className="pa4 black-80">
            <form
              className="measure"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <button
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  value="Sign in"
                  onClick={this.onSubmitSignIn}
                >
                  Sign In
                </button>
              </div>
              <div className="lh-copy mt3">
                <p
                  className="f6 link dim black db pointer"
                  onClick={() => onRouteChange("register")}
                >
                  Register
                </p>
              </div>
            </form>
          </main>
        </article>
      </div>
    );
  }
}

/*const Signin = ({ onRouteChange }) => {
};*/

export default Signin;
