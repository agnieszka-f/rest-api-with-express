const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try{
     res.json(await Testimonial.find());
    } catch(err) {
      res.status(500).json({message: err});
    }
 };

exports.getRandom = async (req, res) => {
    try{
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const result = await Testimonial.findOne().skip(rand);
      if(result) res.json(result);
      else res.status(404),json({message: 'Not found...'});
    } catch(err){
      res.status(500).json({message: err});
    }
  };

exports.getById = async (req, res) => { 
    try{
      const result = await Testimonial.findById(req.params.id);
      if(result) res.json(result);
      else res.status(404),json({message: 'Not found...'});
    } catch(err){
      res.status(500).json({message: err});
    }
  };

exports.createNew =  async (req, res) => {
    const {author, text} = req.body;
    try{
      const newTestimonial = new Testimonial({author:author, text:text});
      await newTestimonial.save();
      res.json({message:'ok'});
    } catch(err){
      res.status(500).json({message: err});
    }
  };

exports.update = async (req, res) => {
    const {author, text} = req.body;
    try{
      const result = await Testimonial.findById(req.params.id);
      if(result){
        await Testimonial.updateOne({_id: result._id},{$set: {author:author, text:text} });
        res.json({message:'ok'});
      } else res.status(404),json({message: 'Not found...'});
    } catch (err){
      res.status(500).json({message: err});
    }
  };

exports.remove = async (req, res) => {
    try{
      const result = await Testimonial.findById(req.params.id);
      if(result){
        result.remove();
        res.json({message:'ok'});
      } else res.status(404),json({message: 'Not found...'});
    } catch(err) {
      res.status(500).json({message: err});
    }
  };
