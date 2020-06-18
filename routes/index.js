const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const currentUser = req.user;
  if (currentUser) {
    res.render('index', { title: currentUser.username});
  }
  else res.render('index', { title: "Someone" });
});

module.exports = router;
