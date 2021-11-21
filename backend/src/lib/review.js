const axios = require('axios').default;
const path = require("path");

require("dotenv").config({path: path.resolve(__dirname, "../../.env")})

const getReviewScore = async (req) => {
    const response = await axios.post(process.env.ReviewAPI,req);
    return response
}

module.exports = {getReviewScore}