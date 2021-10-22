const Seat = require('../models/seat.model'); 

exports.getAll = async (req, res) => {
    try{
      res.json(await Seat.find());
    } catch(err){
      res.status(500).json({message:err});
    }
  };

exports.getById = async (req, res) => { 
    try{
      const result = await Seat.findById(req.params.id);
      if(result) res.json(result);
      else res.status(404).json({message: 'Not found...'});
    } catch (err){
      res.status(500).json({message:err});
    }
  };

exports.createNew = async (req, res) => {
    const {day, seat, client, email } = req.body;
  
    if(day && seat && client && email){
      try{
        const result = await Seat.findOne({ $and: [{day:day}, {seat:seat}] });
        if(!result) {
          const newSeat = new Seat({day:day, seat:seat, client:client, email:email});
          await newSeat.save();
          req.io.emit('seatsUpdated', await Seat.find());	
          res.json({message: 'OK'});
        } else res.json({message: 'The slot is already taken...'});
      } catch(err){
        res.status(500).json({message:err});
      }
    } else res.json({message: 'You have to fill all the fields...'});
  };

exports.update = async (req, res) => {
    const {day, seat, client, email } = req.body;
  
    try{
      const result = await Seat.findById(req.params.id);
      if(result){
        await Seat.updateOne({_id: req.params.id}, {$set: { day:day, seat:seat, client:client, email:email } });
        res.json({message:'ok'});
      } else res.status(404).json({message: 'Not found...'});
    } catch(err){
      res.status(500).json({message:err});
    }
  };

exports.remove = async (req, res) => {
    try{
      const result = await Seat.findById(req.params.id);
      if(result){
        result.remove();
        res.json({message:'ok'});
      } else res.status(404).json({message: 'Not found...'});
    } catch(err){
      res.status(500).json({message:err});
    }
  };