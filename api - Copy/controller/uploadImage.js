const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const dbconnection = require('../database/mysqlConnection')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = (file,bucket,key) => {
   
       const params = {
           Bucket: bucket, 
           Key: key, //contacts.csv
           Body: fs.createReadStream(file)
       };
       s3.upload(params, function(s3Err, file) {
           if (s3Err) throw s3Err
          
       });
    
  };

  
module.exports.uploadImage = async (req,res)=>{
    console.log("UploadImage");
    const image_RAW = req.files['image_RAW'][0];
    const image_DEPTH = req.files['image_DEPTH'][0];
    const image_PROCESS = req.files['image_PROCESS'][0];
    const video = req.files['video'][0];
    let upload_id = 0
    
    dbconnection.query("INSERT INTO wound.upload (`patient_id`, `user_id`,`upload_datetime`) values(?,?,CURRENT_TIMESTAMP());    ",[req.body.patient_id,  req.body.username],  function (err, data, field){
        if(err){
            console.log("ERROR EXECUTING DB QUERY")
            res.json({ success : false , msg: 'unable to insert'});
            return;
        }
    } );

     dbconnection.query("SELECT LAST_INSERT_ID() as id", function(err, data, field){
      
       upload_id = data[0].id  ;
       filename = req.body.username + Date.now() + path.extname(image_RAW.originalname);
   
    dbconnection.query("INSERT INTO `wound`.`upload_filename` (`upload_id`,`file_name`,`file_type`) values(?,?,'raw')",[upload_id,filename], function(err, data, field){
        if(err){console.log(err)} 
    });
   
       filename = req.body.username + Date.now() + path.extname(image_DEPTH.originalname);
       dbconnection.query("INSERT INTO `wound`.`upload_filename` (`upload_id`,`file_name`,`file_type`) values(?,?,'depth')",[upload_id,filename], function(err, data, field){
        if(err){console.log(err)} 
    });
       filename = req.body.username + Date.now() + path.extname(image_PROCESS.originalname);
       dbconnection.query("INSERT INTO `wound`.`upload_filename` (`upload_id`,`file_name`,`type`) values(?,?,'processed')",[upload_id,filename], function(err, data, field){
        if(err){console.log(err)} 
    });
       filename = req.body.username + Date.now() + path.extname(video.originalname);
       dbconnection.query("INSERT INTO `wound`.`upload_filename` (`upload_id`,`file_name`,`type`) values(?,?,'video')",[upload_id,filename], function(err, data, field){
        if(err){console.log(err)} 
    });

        
    dbconnection.query("INSERT INTO `wound`.`doc_wound_details` (`upload_id`,`wound_id`) values(?,?)",[upload_id,req.body.wound_id], function(err, data, field){
        if(err){console.log(err)} 
});
     


     });
    
     
    
    filename = req.body.username + Date.now() + path.extname(image_RAW.originalname);
    uploadFile(image_RAW.path,"wound.data.collection","RAW/"+filename)
    fs.unlinkSync(image_RAW.path)

    filename = req.body.username + Date.now() + path.extname(image_DEPTH.originalname);
    uploadFile(image_DEPTH.path,"wound.data.collection","DEPTH/"+filename)
    fs.unlinkSync(image_DEPTH.path)

    filename = req.body.username + Date.now() + path.extname(image_PROCESS.originalname);
    uploadFile(image_PROCESS.path,"wound.data.collection","Image/"+filename)
    fs.unlinkSync(image_PROCESS.path)

    filename = req.body.username + Date.now() + path.extname(video.originalname);
    uploadFile(video.path,"wound.data.collection","video/"+filename)
    fs.unlinkSync(video.path)

    
    res.json({
        success:true
    })
    return;
}