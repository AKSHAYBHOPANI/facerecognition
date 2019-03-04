import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

const app = new Clarifai.App({
  apiKey: '3c02a31f629f4c1eb5dd0767bcd9503b'
 });

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
      id: 1,
      name: '',
      email: '',
      entries: 0,
      joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

   loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
  displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box});
}

  onInputChange =(event) => {
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(response => {
      if (response) {
        fetch('https://facerecognition-server.herokuapp.com/image', {
         method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        id: this.state.user.id,
       })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count}))
          
        })
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
     })
    .catch(err => console.log(err)); 
  }

onRouteChange = (route) => {
  if (route === 'SignOut') {
    this.setState(initialState);
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

  render() {
     const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home'
        ? <div>
      <Logo/>
      <Rank
      name={this.state.user.name}
      entries={this.state.user.entries}
      />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      
      <FaceRecognition box={box} imageUrl={imageUrl} />
      </div>
      : (
         route === 'SignIn'
        ? <SignIn  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )

      }
      </div>
    );
  }
}

export default App;
