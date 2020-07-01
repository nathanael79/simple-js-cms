var express = require('express');
var router = express.Router();
const model = require('../models/index');
var bcrypt = require('bcrypt');
const { where } = require('sequelize');
var salt = bcrypt.genSaltSync(10);

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
        res.status(400).json({
          'status':'DATA EMPTY',
          'messages':'Data is Empty',
          'data': {}
        })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      'status': 'ERROR',
      'messages': error.messages,
      'data': {}
    })
  }
});

router.post('/', async function(req, res, next) {
  try {
    const{
      name,
      email,
      password,
      roles
    } = req.body

    const users = await model.users.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
      roles
    });

    if(users){
      res.status(201).json({
        'status' : 'OK',
        'messages' : 'User berhasil ditambahkan',
        'data': users
      })
    }
  } catch (error) {
    res.status(400).json({
      'status': 'Error',
      'messages': error.messages,
      'data':{}
    })
  }
});

router.put('/:id', async function(req, res, next) {
  try{
    const usersId = req.params.id;
    const{
      name,
      email,
      password,
      roles
    } = req.body

    const users = await model.users.update({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
      roles
    },{
      where:{
        id: usersId
      }
    })

    if(users){
      res.status(200).json({
        'status': 'OK',
        'messages': 'User berhasil diupdate',
        'data': users,
      })
    }
  }catch(error){
    res.status(400).json({
      'status': 'ERROR',
      'messages': error.message,
      'data': {},
    })
  }
});

router.delete('/:id',async function(req, res, next) {
  try {
    const usersId = req.params.id;
    const users = await model.users.destroy({ where: {
      id: usersId
    }})
    if (users) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil dihapus',
        'data': users,
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

module.exports = router;
