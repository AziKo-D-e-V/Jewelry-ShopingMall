const {v4: uuid} = require('uuid')

class Comment {
  constructor( name, text, userId) {
      this.id = uuid();
      this.name = name;
      this.text = text;
      this.userId = userId;
      this.createdAt = new Date();
  }
}

module.exports = Comment;
