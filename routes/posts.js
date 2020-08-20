const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (req, res) => {
  const posts = [
    { title: 'This is a post!', body: 'This is the body of a post.' },
    { title: 'This is a post!', body: 'This is the body of a post.' },
    { title: 'This is a post!', body: 'This is the body of a post.' }
  ]
  
  return res.status(200).json({ success: true, message: 'Welcome to a protected route!', posts, whoami: req.user._id });
});

module.exports = router;