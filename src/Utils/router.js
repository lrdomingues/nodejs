const { Router } = require('express')

const AuthMiddleware = require('../Middlewares/AuthMiddleware')
const LoginController = require('../Controllers/LoginController')
const PostController = require('../Controllers/PostController')
const ProfileController = require('../Controllers/ProfileController')
const UserController = require('../Controllers/UserController')
const LikeController = require('../Controllers/LikeController')
const CommentController = require('../Controllers/CommentController')
const ReportController = require('../Controllers/ReportController')

const router = Router()

router.post('/login', LoginController.login)
router.post('/users', UserController.createUser)
router.get('/users', AuthMiddleware, UserController.listUsers)
router.post('/posts', AuthMiddleware, PostController.createPost)
router.get('/posts', PostController.listAllPosts)
router.delete('/posts/:post_id', AuthMiddleware, PostController.deletePost)
router.put('/posts/:post_id', AuthMiddleware, PostController.editPost)
router.get('/users/:user_id', AuthMiddleware, ProfileController.getProfile)
router.put('/users', AuthMiddleware, ProfileController.editProfile)
router.post('/posts/:post_id/like', AuthMiddleware, LikeController.likePost)
router.post('/posts/:post_id/dislike', AuthMiddleware, LikeController.dislikePost)
router.post('/comments', AuthMiddleware, CommentController.createComment)
router.get('/comments', AuthMiddleware, CommentController.listAllComments)
router.delete('/comments/:comment_id/', AuthMiddleware, CommentController.deleteComment)
router.put('/comments/:comment_id', AuthMiddleware, CommentController.editComment)
router.get('/report', AuthMiddleware, ReportController.getReport)

router.get('/hello', (req, res) => {
  res.send('Hello World!')
})

module.exports = router
