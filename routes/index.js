import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    res.redirect('/employee');
  } catch (error) {
    res.status(500).send('An error occurred'); 
  }
});

export default router;
