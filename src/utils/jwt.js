const jwt = require("jsonwebtoken");

const SECRETKEY = process.env.SECRETKEY;

const sign = (payload) => 
  jwt.sign(payload, SECRETKEY, { expiresIn: "10h" });
const verify = (token) => 
  jwt.verify(token, SECRETKEY);


module.exports = {
  verify,
  sign,
};
