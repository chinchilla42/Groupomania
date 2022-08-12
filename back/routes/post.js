/* Import Express*/
const express = require('express');

/* Create router*/
const router = express.Router();

/* Import authentication middleware */
const auth = require('../middleware/auth');

/* Import file management middleware to handle images */
const multer = require('../middleware/multer-config');

/* Import controllers */
const postCtrl = require('../controllers/post');

/* Save routes */
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.findPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);

/* Export router */
module.exports = router;