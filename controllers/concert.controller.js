const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try{
      res.json(await Concert.find());
     } catch(err) {
       res.status(500).json({message: err});
     }
  };

exports.getById = async (req, res) => { 
    try{
      const result = await Concert.findById(req.params.id);
      if(result) res.json(result);
      else res.status(404),json({message: 'Not found...'});
    } catch(err){
      res.status(500).json({message: err});
    }
  };

exports.createNew = async (req, res) => {
    try{
     const newConcert = new Concert({performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image});
     await newConcert.save();
     res.json({message:'ok'});
   } catch(err){
     res.status(500).json({message: err});
   }
 };

exports.update = async (req, res) => {
    try{
      const result = await Concert.findById(req.params.id);
      if(result){
        await Concert.updateOne({_id: result._id},{$set: {performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image} });
        res.json({message:'ok'});
      } else res.status(404),json({message: 'Not found...'});
    } catch (err){
      res.status(500).json({message: err});
    }
  };

exports.remove =  async (req, res) => {
    try{
      const result = await Concert.findById(req.params.id);
      if(result){
        result.remove();
        res.json({message:'ok'});
      } else res.status(404),json({message: 'Not found...'});
    } catch(err) {
      res.status(500).json({message: err});
    }
  };

exports.getByPerformer = async (req, res) => {
  try{
    const result = await Concert.find({performer: req.params.performer});
    if(result) res.json(result);
    else res.status(404),json({message: 'Not found...'});
  } catch(err){
    res.status(500).json({message: err});
  }
};

exports.getByGenre = async (req, res) => {
  try{
    const result = await Concert.find({genre: req.params.genre});
    if(result) res.json(result);
    else res.status(404),json({message: 'Not found...'});
  } catch(err){
    res.status(500).json({message: err});
  }
};

exports.getByPrice = async (req, res) => {
  try{
    const result = await Concert.find({ $and: [{price: {$gte: req.params.price_min} }, {price: {$lte: req.params.price_max} }] });
    if(result) res.json(result);
    else res.status(404),json({message: 'Not found...'});
  } catch(err){
    res.status(500).json({message: err});
  }
};

exports.getByDay = async (req, res) => {
  try{
    const result = await Concert.find({day: req.params.day});
    if(result) res.json(result);
    else res.status(404),json({message: 'Not found...'});
  } catch(err){
    res.status(500).json({message: err});
  }
};