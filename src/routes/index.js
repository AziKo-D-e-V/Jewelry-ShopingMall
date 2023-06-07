const auth = require('./auth.route')
const product = require('./product.route')
const comment = require('./comment.route')
const admin = require('./admin.route')

module.exports = [auth, product, comment, admin]