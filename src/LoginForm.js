import React from 'react';
import InputField from './components/InputField'
import SubmitButton from './components/SubmitButton'
import User from './User';

class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      user_type:'',
      buttonDisabled:false
    }
  }
  setInputValue(property, val){
    val = val.trim();
    if(val.length > 12){
      return;
    }
    this.setState({
      [property]:val
    })
  }

    resetForm(){
      this.setState({
        username:'',
        password:'',
        buttonDisabled:false
  
      })
    }

    async doLogin(){
      
      if(!this.state.username){
        return;
      }
      if(!this.state.password){
        return;
      }
      try{
        let res = await fetch('/login',{
          method: 'post',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body : JSON.stringify({
            username:this.state.username,
            password:this.state.password
          })
        });

        var result = await res.json();
        if(result && result.success){
          console.log(result)
          User.isLoggedIn = true;
          User.username = result.user_name
          User.user_type = result.user_type
          User.patient_data = result.patient_data
        }
        else if(result && result.success === false){
          this.resetForm();
          alert(result.msg)
        }
      }catch(e){
        console.log(e);
        this.resetForm();
      }
    }

  
  render(){
  return (
    <div className="App">
      Log in
      <InputField type='text'  placeholder='Username' value ={this.state.username}
      onChange={ (val) =>this.setInputValue('username',val) }
      />

      <InputField type='password' placeholder='Enter Password' value ={this.state.password}
      onChange={ (val) =>this.setInputValue('password',val) }
      />

      <SubmitButton
      text='Login'
      disable={this.state.buttonDisabled}
      onClick={ () => this.doLogin()}
      ></SubmitButton>
      
    </div>
  )}
}

export default LoginForm;
