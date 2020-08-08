import React from 'react';
import InputField from './components/InputField'
import SubmitButton from './components/SubmitButton'
import User from './User';

class Add_Patient extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username:'',
      patient_id:'',
      patient_name:'',
      gender:'',
      dob:'',
      user_type:'',
      buttonDisabled:false
    }
  }
 
  
  setInputValue(property, val){   
    this.setState({
      [property]:val
    })
  }

    async Add_Patient_api(){
      try{
        let res = await fetch('/addpatient',{
          method: 'post',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body : JSON.stringify({
            username:this.state.username,
            patient_id:this.state.patient_id,
            patient_name: this.state.patient_name,
            gender:this.state.gender,
            dob:this.state.dob
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
         
          alert(result.msg)
        }
      }catch(e){
        console.log(e);
        
      }
    }

  
  render(){
  return (
    <div className="App">
      Add patient

      <InputField type='text'  placeholder='Enter Patient Name' value ={this.state.patient_name}
      onChange={ (val) =>this.setInputValue('patient_name',val) }
      />

      <InputField type='text'  placeholder='Enter Gender' value ={this.state.gender}
      onChange={ (val) =>this.setInputValue('gender',val) }
      />

      <InputField type='date' placeholder='Enter DOB' value ={this.state.dob}
      onChange={ (val) =>this.setInputValue('dob',val) }
      />

      <SubmitButton
      text='Add Patient'
      disable={this.state.buttonDisabled}
      onClick={ () => this.Add_Patient_api()}
      ></SubmitButton>
      
    </div>
  )}
}

export default Add_Patient;
