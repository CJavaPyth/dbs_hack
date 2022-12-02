const Post = require("../Models/PostModel");

module.exports.getPosts = async (req, res, next) => {
    try {
            // fetch the posts
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.json({message: err})
    }
}

module.exports.specificPost = (req, res, next) => {
    res.send('Inside the specific post!');
}

module.exports.savePost = async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });
    
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err})
    }
   
}

module.exports.getPost = async (req, res, next) => {
    try {
            // fetch the posts
        const post = await Post.findById(req.params.postId);
        res.json(post)
    } catch (err) {
        res.json({message: err})
    }
}

module.exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
                {$set: {
                    title: req.body.title,
                    description: req.body.description
                },
            }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err})
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        const removePost = await Post.remove({
            _id: req.params.postId
        })
        res.json(removePost);
    } catch (err) {
        res.json({message: err})
    }
}