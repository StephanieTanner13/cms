var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //the instructions have this line below instead of the one that is not commented out
  //res.render('index', {title: 'CMS'});
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

module.exports = router;
