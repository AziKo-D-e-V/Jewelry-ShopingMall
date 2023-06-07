const Io = require("../utils/Io");
const Admins = new Io("./database/admins.json");
const Admin = require("../models/users");
const jwt = require("../utils/jwt");
const bcrypt = require("bcrypt");
const { authValidation } = require("../validations/auth.validation");

const adminRegister = async (req, res) => {
  const { username, password } = req.body;

  const error = authValidation({ username, password });
  
  if (error) return res.status(403).json({ massage: error });

  const admins = await Admins.read();

  
  const findAdmin = admins.find((admin) => admin.username === username);

  if (!findAdmin) {
    const hashPass = await bcrypt.hash(password, 10);

    const newAdmin = new Admin(username, hashPass);
    
    const data = admins.length ? [...admins, newAdmin] : [newAdmin];
    await Admins.write(data);
    
    const token = jwt.sign({ AdminId: newAdmin.id });
    
    res.status(200).json({ message: "Successfully registered", token: token });
  } else {
    res.status(403).json({ message: "this user already registered" });
  }
};
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  
  const error = authValidation({ username, password });
  

  if (error) return res.status(403).json({ massage: error });
  const admins = await Admins.read();
  const findAdmin = admins.find((admin) => admin.username === username);
  if (!findAdmin)
    return res.status(403).json({ message: "Admin Username or password wrong" });

  const checkPass = await bcrypt.compare(password, findAdmin.password);
  if (!checkPass)
    return res.status(403).json({ message: "Incorrect password" });

  const token = jwt.sign({ AdminId: findAdmin.id });
  res.status(200).json({ message: "Successfully logined", token: token });
};
module.exports = { adminRegister, adminLogin };
