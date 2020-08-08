const dbconnection = require('../database/mysqlConnection')

module.exports.addPatient = async (req,res)=>{
    patient_name = req.body.patient_name;
    gender = req.body.gender;
    dob = req.body.dob;
    user_name = req.body.user_name;
    dbconnection.query("INSERT INTO wound.patient (`patient_id`, `patient_name`,`gender`,`dob`,`created_by` ) values(patient_auto_increment(), ? , ? , ?, ? );    ",[patient_name, gender, dob, user_name],  function (err, data, field){
        if(err){
            res.json({ success : false , msg: 'unable to insert'});
            return;
        }
      
         res.json({ success : true , msg: 'inserted_record'});
                return;
    } )
  //  res.json({ success : true , msg: 'incorrect user_name'});
    
    return; 
}