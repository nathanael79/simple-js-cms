var express = require('express');
var router = express.Router();
const model = require('../models/index');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await model.users.findAll({})
    if (users.length !== 0) 
    {
      res.json({
        'status':'OK',
        'messages':'',
        'data': users
      })
    }
    else
    {
        res.json({
          'status':'DATA EMPTY',
          'messages':'Data is Empty',
          'data': {}
        })
    }
  }
  catch (error) {
    console.log(error);
    res.json({
      'status': 'ERROR',
      'messages': error.messages,
      'data': {}
    })
  }
});

router.post('/', function(req, res, next) {

});

router.patch('/:id', function(req, res, next) {

});

router.delete('/:id', function(req, res, next) {
  
});

module.exports = router;
