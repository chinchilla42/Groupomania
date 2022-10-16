/* Import Post model */
const Post = require('../models/Post');

/* import fs package to access file system mangement */
const fs = require('fs');

/* POST: create a post */
exports.createPost = (req, res, next) => {
    const postObject = req.body;
    const post = new Post({
        ...postObject,
    });
    if (req.file)
    {
        post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    post
      .save()
      .then(() => res.status(201).json({ post }))
      .catch((err) => console.log(err));
  };

/* GET: get all posts*/
exports.getAllPosts = (req, res, next) => 
{ 
    Post.find()
    .then((posts) => {res.status(200).json(posts);})
    .catch((error) => {console.log(error);res.status(400).json({error: error});});      
};

/* GET: get one post*/
exports.findPost = (req, res, next) => 
{
    Post.findOne({ _id: req.params.id })
        .then((post) => { res.status(200).json(post);})
        .catch((error) => { res.status(404).json({ message :'test' });});
};

/* PUT: update a post */
exports.updatePost= (req, res, next) => 
{
    const postObject = req.body;
    const newPost = new Post({
        ...postObject,
    });
    if (req.file)
    {
        newPost.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } 

    delete postObject._userId;
   Post.findOne({ _id: req.params.id })
   .then( post => 
   {
        if (post.userId == req.auth.userId || req.auth.admin)
       {
           Post.updateOne({ _id: req.params.id}, { $set: newPost, _id: req.params.id })
           .then (() => res.status(200).json({ message: 'Publication modifiée'}))
           .catch(error => res.status(401).json({ error }));
       }
       else
       {
        console.log(req.auth.admin);
         res.status(401).json({message: 'Non autorisé'});
    }
   })
   .catch ((error) => {res.status(400).json({ error})});
};

 /* DELETE: delete a post */
 exports.deletePost= (req, res, next) => 
 {
    let postId = req.params.id;
    let userId = req.auth.userId;  
    Post.findOne({ _id: req.params.id })
     .then(post => 
     {
         if ((post.userId == req.auth.userId) || req.auth.admin == true)
         {
            if (post.imageUrl) 
                {
                    const filename = post.imageUrl.split('/images/')[1];
                    fs.unlink(`./images/${filename}`, () => {
                        Post.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Publication supprimée' }))
                            .catch(error => { res.status(401).json({ message: 'erreur 401' }) });
                    })
                }
                else 
                {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Publication supprimée' }))
                        .catch(error => { res.status(401).json({ message: 'erreur 401' }) });
                }
         }
         else
         {
            res.status(401).json({message: 'Utilisateur non autorisé'});
         }
     })      
     .catch((error) => {res.status(500).json({error: error});});
 };

/* POST: like a post */
exports.likePost = (req, res, next) => 
{
    const like = req.body.like;
    const userId = req.body.userId;
    const postId = req.params.id;
    /* user "unlikes" a post */
    Post.findOne
    (
        { _id: postId }
    )
    .then((post) => 
    {
        if (post.usersLiked.includes(userId)) 
        {   
            Post.updateOne
            (
                { _id: postId },
                {
                    $inc: { likes: -1 },
                    $pull: { usersLiked: userId }
                }
            )
            .then(() => res.status(200).json({ message: "Liked removed" }))
            .catch((error) => res.status(400).json({ error }));
        }
        /* user likes a post */
        else 
        {
            Post.findOneAndUpdate
            (
                { _id: postId },
                {
                    $inc: { likes: 1 },
                    $push: { usersLiked: userId }
                }
            )
        .then(() => res.status(200).json({ message: "Liked" }))
        .catch((error) => res.status(400).json({ error }))
        }
    })
}