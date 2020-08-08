const dbconnection = require('../database/mysqlConnection')

module.exports.addWoundPatient = async (req,res)=>{
    console.log("In Add Wound")
    patient_name = req.body.patient_name
    wound_location = req.body.wound_location
    wound_reason = req.body.wound_reason
    wound_begin_date = req.body.wound_begin_date
    created_by = req.body.user_name
    
    dbconnection.query("INSERT INTO wound.wound (`patient_id`, `wound_reason`,`wound_location`,`wound_begin_date`,`created_by` ) values(?,?,?,?,? );    ",[patient_name, wound_reason,wound_location,wound_begin_date,created_by],  function (err, data, field){
        if(err){
            res.json({ success : false , msg: err});
            return;
        }
      
         res.json({ success : true , msg: 'inserted_record'});
                return;
    } )
  
    return; 
}