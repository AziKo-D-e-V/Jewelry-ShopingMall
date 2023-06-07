  const Io = require("../utils/Io");
const Users = new Io("./database/users.json");
const User = require("../models/users");
const jwt = require("../utils/jwt");
const bcrypt = require("bcrypt");
const { authValidation } = require("../validations/auth.validation");

const register = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const error = authValidation({ username, password });
  
  if (error) return res.status(403).json({ massage: error });

  const users = await Users.read();

  
  const findUser = users.find((user) => user.username === username);

  if (!findUser) {
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User(username, hashPass);
    
    const data = users.length ? [...users, newUser] : [newUser];
    await Users.write(data);
    
    const token = jwt.sign({ userId: newUser.id });
    
    res.status(200).json({ message: "Successfully registered", token: token });
  } else {
    res.status(403).json({ message: "this user already registered" });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  
  const error = authValidation({ username, password });
  

  if (error) return res.status(403).json({ massage: error });
  const users = await Users.read();
  const findUser = users.find((user) => user.username === username);
  if (!findUser)
    return res.status(403).json({ message: "Username or password wrong" });

  const checkPass = await bcrypt.compare(password, findUser.password);
  if (!checkPass)
    return res.status(403).json({ message: "Incorrect password" });

  const token = jwt.sign({ userId: findUser.id });
  res.status(200).json({ message: "Successfully logined", token: token });
};
module.exports = { register, login };
