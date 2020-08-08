const express = require('express');
const multer = require('multer');


const router = express.Router();

const loginValidation = require('../controller/loginValidation');
const addPatient = require('../controller/addPatient');
const uploadImage = require('../controller/uploadImage');
const upload = require('../controller/upload');
const ListWounds = require('../controller/ListWounds')
const addWoundPatient = require('../controller/addWoundPatient');
const patient = require('../controller/getPatients');
const wound = require('../controller/wound');
const patientDetails = require('../controller/patientDetails');



router.route('/login').post(loginValidation.loginValidation);
router.route('/ListWounds').get(ListWounds.ListWounds); 

router.route('/addPatient').post(addPatient.addPatient);  
router.route('/addWoundPatient').post(addWoundPatient.addWoundPatient);    

router.route('/getAllPatients').get(patient.getPatients);
router.route('/getAllWounds').get(wound.wound);
router.route('/getAllPatientsDetails').post(patientDetails.patientDetails);

router.route('/uploadImage').post(multer({dest:'temp/'}).fields([{name:'image_RAW',maxCount:1},{name:'image_DEPTH',maxCount:1},{name:'image_PROCESS',maxCount:1},{name:'video',maxCount:1},{name:'username'},{name:'patient_id'},{name:'wound_id'}]),
    uploadImage.uploadImage);   

router.route('/upload').post(upload.upload);   

module.exports = router;