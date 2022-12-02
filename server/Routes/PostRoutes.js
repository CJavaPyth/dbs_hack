const { getPosts, getPost, specificPost, savePost, updatePost, deletePost} = require("../Controllers/PostControllers");

const Post = require("../Models/PostModel");
const postRoutes = require("express").Router();

postRoutes.get("/posts", getPosts);
postRoutes.get("/spec_post", specificPost);
postRoutes.post("/posts", savePost);
postRoutes.get("/posts/:postId", getPost);
postRoutes.patch("/posts/:postId", updatePost);
postRoutes.delete("/posts/:postId", deletePost);

module.exports = postRoutes;
