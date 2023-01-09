const express = require('express');
const router = express.Router();

const { userSignUp, userLogin, verifyTokenOfUser, imageUpload  } = require('../controllers/user');
const { uploadSingleFile } = require('../utils/multer');



router.post('/signup',userSignUp);
router.post('/login',userLogin);
router.post('/verify-token',verifyTokenOfUser);
router.post('/imageupload/:token',uploadSingleFile,imageUpload);



module.exports = router;