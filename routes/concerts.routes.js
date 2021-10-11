const express = require('express');
const router = express.Router();

const db = require('../db/db.js');

const concerts = db.concerts;

router.route('/concerts').get((req, res) => {
  res.json(concerts);
});

router.route('/concerts/:id').get((req, res) => { 
  const index  = concerts.findIndex(el => el.id == req.params.id);
  index != -1 ? res.json(concerts[index]) : res.json({message: 'Wrong id!'});
});

router.route('/concerts').post((req, res) => {
  concerts.push({id: Date.now(), performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image});
  res.json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const index  = concerts.findIndex(el => el.id == req.params.id);
  if(index != -1){
	concerts[index] = {id: req.params.id, performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image };
	res.json({message: 'OK'});  
  }
   else res.json({message: 'Wrong id!'});
});

router.route('/concerts/:id').delete((req, res) => {
  const index  = concerts.findIndex(el => el.id == req.params.id);
  if(index != -1){
	concerts.splice(index,1);
	res.json({message: 'OK'});  
  }
   else res.json({message: 'Wrong id!'});
});

module.exports = router;