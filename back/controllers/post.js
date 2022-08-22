/* Import Post model */
const Post = require('../models/Post')

/* import fs package to access file system mangement */
const fs = require('fs');

/* POST: create a post */ //fonctionne pour publication sans image
// exports.createPost = (req, res, next) => 
// {
//     Post.create ({
        
//         content: req.body.content,
//         userId : req.body.userId,
//     })

//     .then((newPost) => res.status(201).json({newPost, message: "Publication enregistrée"}))
//     .catch(error => res.status(400).json({ message: 'erreur création de post' }));
// };

/* POST: create a post */ //essai pour publication avec image
exports.createPost = (req, res, next) => 
{
    if (req.file) 
    {
        Post.create({
            userId: req.body.userId,
            content: req.body.content,
        })
            .then((newPost) => res.status(201).json({ newPost, message: "Publication enregistrée" }))
            .catch(error => res.status(400).json({ message: 'erreur création de post' }));
    }
    else if (req.file) 
    {
        Post.create({
            userId: req.body.userId,
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

        })
            .then((newPost) => res.status(201).json({ newPost, message: "Publication enregistrée" }))
            .catch(error => res.status(400).json({ message: 'erreur création de post' }));
    }
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
        .then((post) => { res.status(200).json(post); })
        .catch((error) => { res.status(404).json({ message :'test' });});
};

/* PUT: update a post */
exports.updatePost= (req, res, next) => 
{
   const postObject = req.file ? 
   {
       ...JSON.parse(req.body.post),
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
   } : { ...req.body};
   delete postObject._userId;
   Post.findOne({ _id: req.params.id })
   .then( post => 
   {
       if (post.userId != req.auth.userId)
       {
           res.status(401).json({message: 'Non autorisé'});
       }
       else
       {
           Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id })
           .then (() => res.status(200).json({ message: 'Publication modifiée'}))
           .catch(error => res.status(401).json({ error }));
       }
   })
   .catch ((error) => {res.status(400).json({ error})});
};

 /* DELETE: delete a post */
 exports.deletePost= (req, res, next) => 
 {
     Post.findOne({ _id: req.params._id })
     .then(post => 
     {
         if (post.userId != req.auth.userId)
         {
             res.status(401).json({message: 'Non autorisé'});
         }
         else
         {
             console.log(post)
             //const filename = post.imageUrl.split('/images/')[1];
             //fs.unlink(`images/${filename}`, () =>
            //  {
                 Post.deleteOne({ _id: req.params.id })
                 .then (() => res.status(200).json({ message: 'Publication supprimée'}))
                 .catch( error => {res.status(401).json({ message: 'erreur 401'})});
            //  });
         }
     })      
     .catch((error) => {res.status(500).json({message: 'erreur 500'});});
 };

/* POST: like a post */
exports.likePost = (req, res, next) => 
{
    const like = req.body.like;
    const userId = req.body.userId;
    const postId = req.params.id;
    /* user likes a post */
    if (like === 1) 
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
        .catch((error) => res.status(400).json({ error }));
    }
    else 
    {
        Post.findOne
            (
                { _id: postId }
            )
        .then((post) => 
        {
            /* user "unlikes" a post */
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
        })
        .catch((error) => res.status(400).json({ error }));
    }
};