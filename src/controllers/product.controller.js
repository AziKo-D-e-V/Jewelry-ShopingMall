const { productValidation } = require("../validations/product.validation");
const Io = require("../utils/Io");
const Product = require("../models/products");
const Products = new Io("./database/products.json");
const jwt = require("../utils/jwt");

const getAll = async (req, res) => {

    const products = await Products.read();
    
    res.status(200).json(products);

};
const Create = async (req, res) => {
  const { AdminId } = req.user;

  const { name, price } = req.body;

  const error = productValidation({ name, price });

  if (error) {
    return res.status(400).json({ message: error });
  }

  const products = await Products.read();
  const newProduct = new Product(name, price, AdminId);

  const data = products.length ? [...products, newProduct] : [newProduct];

    await Products.write(data)

    res.status(200).json({ message: "Product successfully created"})
};

module.exports = {
  getAll,
  Create,
};
