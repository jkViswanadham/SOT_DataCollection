import React from 'react';
import { observer} from 'mobx-react'
import User from './User'
import LoginFrom from './LoginForm'
import Add_Patient from './AddPatient'
import SubmitButton from './components/SubmitButton'

import './CSS/App.css';

class App extends React.Component {

  async componentDidMount(){
    try{
      let res = await fetch('/isLoggedIn',{
        method:'post',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      });

      var result = await res.json();
      if(result && result.success){
        User.loading = false;
        User.isLoggedIn = true;
        User.username = result.username;
      }
      else{
        User.loading = false;
        User.isLoggedIn = false;
      }
    }catch(e){
      User.loading = false;
      User.isLoggedIn = false;
    }

  }


  async doLogout(){
    console.log("Log OUt")
    try{
      let res = await fetch('/logout',{
        method:'post',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      });

      var result = await res.json();
      if(result && result.success){
        User.isLoggedIn = false;
        User.username = result.username;
      }
     
    }catch(e){
     console.log(e);
    }

  }

 

  render(){
    if(User.loading){
      return (
        <div className="App">
         Login Page
        </div>
      ) 
    }
    if(User.isLoggedIn){
      return(
        <div className='app'>
          <div className='container'>
            Welcome {User.username}
          </div>
          <div className ='container'>
          <Add_Patient/>
          </div>
        </div>
      )
    }
  return (
    <div className="App">
      <div className='container'>
        <SubmitButton text ={'Log Out'} disabled={false} onClick={ () => this.doLogout()} />
        <LoginFrom/>
      </div>
    </div>
  )}
}

export default observer(App);
