const dbconnection = require('../database/mysqlConnection')

module.exports.loginValidation = async (req,res)=>{
    user_name = req.body.username;
    password = req.body.password; 
    dbconnection.query("SELECT password, user_role from wound.users where user_id = ?",[user_name],  function (err, data, field){
        if(err){
            res.json({ success : false , msg: 'error occured'});
            return;
        }
        if(data){
            if(data[0].password == password){
                res.json({ success : true , msg: 'login'});
            return;
            }
            else{
                res.json({ success : false , msg: 'password in correc'});
                return;
            }

        }
         res.json({ success : false , msg: 'incorrect user_name'});
                return;
    } )
  //  res.json({ success : true , msg: 'incorrect user_name'});
    
    return; 
   
}

