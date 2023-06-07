const {v4: uuid} = require('uuid')

class Product {
  constructor( name, price, AdminId) {
      this.id = uuid();
      this.name = name;
      this.price = price;
      this.AdminId = AdminId;
      this.createdAt = new Date();
  }
}

module.exports = Product
