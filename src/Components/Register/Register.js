import React from 'react';

class Register extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    email: '',
    password: '',
    name:''
  }
}
onNameChange = (event) => {
  this.setState({name: event.target.value})
}
onEmailChange = (event) => {
  this.setState({email: event.target.value})
}

onPasswordChange = (event) => {
  this.setState({password: event.target.value})
}

onSubmitSignIn = () => {
  fetch('https://facerecognition-server.herokuapp.com/register', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    })
  })
   .then(response => response.json())
   .then(user => {
    if (user.id) {
      this.props.loadUser(user)
       this.props.onRouteChange('home');
    }
  })
  
}

  render() {
    const { onRouteChange } = this.props;
     return (
        <div className="mw7 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 f1 w-7 ba">
        <article className="pa4 black-80" > Register
        <form action="sign-up_submit" method="get" accept-charset="utf-8">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className=" f1 ph0 mh0 fw6 clip">Welcome</legend>

            <label className="f1 db fw4 lh-copy f6" htmlFor="name">Name</label>
              <input className="b pa2 input-reset ba bg-transparent" type="text" name="name"  id="name" onChange={this.onNameChange}/>
            <div className="mt3">
              <label className="f1 db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
            </div>
            <div className="mt3">
              <label className="f1 db fw4 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
            </div>
          </fieldset>
          <div className="mt3"><input 
          onClick={this.onSubmitSignIn}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign In"/></div>
        </form>

     
        
      </article>
      </div>
    )
  }
    
}

export default Register;