import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component.jsx'
import Shop from './pages/shop/shop.component';
import SignIn_SignOut from './pages/sign-in_sign-out/sign-in_sign-out.component';
import { Route,Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.util';
import { Component } from 'react/cjs/react.production.min';
import { createUserProfileDocument } from './firebase/firebase.util';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async user =>{
     if(user){
       const userRef =await createUserProfileDocument(user);
       
       userRef.onSnapshot(snapshot=>{
         this.setState({currentUser:{id:snapshot.id,...snapshot.data()}})
       })
     }
     else{this.setState({currentUser:user})}
   })
 }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/logIn' component={SignIn_SignOut} />
        </Switch>
      </div>
    );
  }
}

export default App;
