const express = require('express');
const router = express.Router();

const db = require('../db/db.js');

const seats = db.seats; 

router.route('/seats').get((req, res) => {
  res.json(seats);
});

router.route('/seats/:id').get((req, res) => { 
  const index  = seats.findIndex(el => el.id == req.params.id);
  index != -1 ? res.json(seats[index]) : res.json({message: 'Wrong id!'});
});

router.route('/seats').post((req, res) => {
  const {day, seat, client, email } = req.body;
  
  if(day && seat && client && email){
	  
    if(seats.some(el => el.day != day && el.seat != seat)){ 
        seats.push({id: Date.now(), day, seat, client, email });
        res.json({message: 'OK'});		
        req.io.emit('seatsUpdated', seats);	
    } else res.json({message: 'The slot is already taken...'});
	
  } else res.json({message: 'You have to fill all the fields...'});
});

router.route('/seats/:id').put((req, res) => {
  const index  = seats.findIndex(el => el.id == req.params.id);
  if(index != -1){
	seats[index] = {id: req.params.id, day: req.body.day, seat: req.body.seat, client: req.body.client, email: req.body.email };
	res.json({message: 'OK'});  
  }
   else res.json({message: 'Wrong id!'});
});

router.route('/seats/:id').delete((req, res) => {
  const index  = seats.findIndex(el => el.id == req.params.id);
  if(index != -1){
	seats.splice(index,1);
	res.json({message: 'OK'});  
  }
   else res.json({message: 'Wrong id!'});
});

module.exports = router;