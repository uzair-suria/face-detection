import React from "react";
import Imagelinkform from "./components/ImageLinkForm/ImageLinkForm";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import "./App.css";
// import Particlebackground from "./components/ParticleBackground/ParticleBackground";
import Facerecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const initialState = {
  input: "",
  imageUrl: "",
  parsedBoundingBox: {},
  route: "signin",
  isSignedIn: false,
  user: {
    name: "",
    email: "",
    id: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const rawBoundingBox = JSON.parse(data, null, 2).outputs[0].data.regions[0]
      .region_info.bounding_box;

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    const box = {
      top: rawBoundingBox.top_row * height,
      right: width - rawBoundingBox.right_col * width,
      bottom: height - rawBoundingBox.bottom_row * height,
      left: rawBoundingBox.left_col * width,
    };
    this.setState({ parsedBoundingBox: box });

    console.log(this.state.parsedBoundingBox);
  };
  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const reqBody = JSON.stringify({
      user_app_id: {
        user_id: "uzairazizsuria",
        app_id: "smart-brain",
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key 1669f156181541e0962f41530c8db8c9",
      },
      body: reqBody,
    };

    const onSubmit = () => {
      this.setState({ imageUrl: this.state.input, parsedBoundingBox: {} });
      fetch(
        "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (result) {
            fetch("http://localhost:3010/image", {
              method: "put",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((res) => res.json())
              .then((count) => {
                console.log(count);
                this.setState({ user: { ...this.state.user, entries: count } });
              });
          }
          this.calculateFaceLocation(result);
        })
        .catch((error) => console.log("error", error));
    };

    return (
      <>
        <Navigation
          onRouteChange={this.onRouteChange}
          route={this.state.route}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "home" ? (
          <>
            <Rank name={this.state.user.name} count={this.state.user.entries} />
            <Imagelinkform
              onInputChange={this.onInputChange}
              onSubmit={onSubmit}
            />
            <Facerecognition
              imageUrl={this.state.imageUrl}
              box={this.state.parsedBoundingBox}
            />
          </>
        ) : this.state.route === "signin" || this.state.route === "signout" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </>
    );
  }
}

export default App;
