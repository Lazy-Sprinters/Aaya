//This file will contain routes for media upload
const express = require('express');
const bucket = require('../db_config/firebase');
const utils = require('../lib/util');
const multer = require('multer');
const uuid = require('uuid');

const router = new express.Router();
const upload = multer({
  storage:  multer.memoryStorage(),
  limits:{
    fileSize: 10*1024*1024,
  }
});

//Upload a pdf to GCS.
router.post('/', upload.single('file'), async (req, res) =>{
  try{
    if (req.file == undefined || (req.file.mimetype != 'application/pdf' && req.file.mimetype.includes("image") == false)){
      throw new Error("Invalid File/File Format");
    }

    let fileExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
    const fileBuffer = new Uint8Array(req.file.buffer);
    const options = {
      version: "v4",
      action: "read",
      expires: Date.now() + 10005 * 60 * 1000, // 10005 minutes
    };
    
    const uploaded_file = bucket.file(`UserFiles/${uuid.v4()}.${fileExt}`);
    await uploaded_file.save(fileBuffer, {
      resumable: false,
      metadata: { contentType: req.file.mimeType},
    });
    
    const url = await uploaded_file.getSignedUrl(options);
    res.send(utils.responseUtil(200, "File uploaded successfully", {file_url: url}));
  }catch(err){
    res.send(utils.responseUtil(400, err.message, null));
  }
})

module.exports = router;