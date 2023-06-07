const Io = require("../utils/Io");
const Comments = new Io("./database/comments.json");
const Comment = require("../models/comment");
const { commentValidation } = require("../validations/comment.validation");

const getAllComment = async (req, res) => {
  const comments = await Comments.read();

  res.status(200).json(comments);
};

const createComment = async (req, res) => {
  const { userId } = req.user;
  const { name, text } = req.body;

    const error = commentValidation({name, text})
    if (error) { 
        return res.status(200).json({message: error.message});
    }

    const comments = await Comments.read()

    const newComment = new Comment(name, text, userId);

    const data = comments.length ? [...comments, newComment] : [newComment];

    await Comments.write(data);

    res.status(200).json({message: "Comment created successfully"})
};

module.exports = {
  getAllComment,
  createComment,
};
