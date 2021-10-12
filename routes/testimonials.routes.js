const express = require('express');
const router = express.Router();

const db = require('../db/db.js');

const testimonials = db.testimonials; 

router.route('/testimonials').get((req, res) => {
  res.json(testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(testimonials[Math.floor(Math.random() * testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => { 
  const index  = testimonials.findIndex(el => el.id == req.params.id);
  index != -1 ? res.json(testimonials[index]) : res.json({message: 'Wrong id!'});
});

router.route('/testimonials').post((req, res) => {
  testimonials.push({id: Date.now(), author: req.body.author, text: req.body.text});
  res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  const index  = testimonials.findIndex(el => el.id == req.params.id);
  if(index != -1){
	testimonials[index] = {id: req.params.id, author: req.body.author, text: req.body.text };
	res.json({message: 'OK'});  
  }
   else res.json({message: 'Wrong id!'});
});

router.route('/testimonials/:id').delete((req, res) => {
  const index  = testimonials.findIndex(el => el.id == req.params.id);
  if(index != -1){
	testimonials.splice(index,1);
	res.json({message: 'OK'});  
  }
   else res.json({message: 'Wrong id!'});
});

module.exports = router;
