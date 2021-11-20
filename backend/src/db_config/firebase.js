const {Storage} = require('@google-cloud/storage')
const path=require('path');

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const storage=new Storage({
      projectId:process.env.FirebaseProjectId,
      keyFilename:path.resolve(__dirname,'../../aaya-c5378-firebase-adminsdk-smep7-929cd537c5.json')
})

const bucket=storage.bucket(process.env.FirebaseStorageBucket);

module.exports=bucket