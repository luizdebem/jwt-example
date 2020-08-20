const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).json({ success: false, error: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({ success: true, data: savedUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.errors });
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ success: false, error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ success: false, error: 'Wrong credentials' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).json({ success: false, error: 'Wrong credentials' });

  return res.status(200).json({ success: true })
});

module.exports = router;