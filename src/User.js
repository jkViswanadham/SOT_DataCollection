import { extendObservable } from "mobx";

class User{
    constructor(){
      
        extendObservable(this,{
            loading: true,
            isLoggedIn:false,
            username:'',
            user_type:0,
            password:'',
            patient_data: ''
        })
    }
}

export default new User();


