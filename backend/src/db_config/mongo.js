const mongoose = require('mongoose');
const path = require('path');

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
// const db_uri = process.env.DbHostProd;
const db_uri = process.env.DbHostLocal;


mongoose.connect(db_uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
    console.log(err);
});
