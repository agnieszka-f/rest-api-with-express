const express = require('express');
const app = express();

const router = express.Router();
const db = require('./db/db.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonials/:id', (req, res) => { 
  const index  = db.findIndex(el => el.id == req.params.id);
  index != -1 ? res.json(db[index]) : res.json({message: 'Wrong id!'});
});

app.get('/testimonialsrandom', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.post('/testimonials', (req, res) => {
  db.push({id: Date.now(), author: req.body.author, text: req.body.text});
  res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  const index  = db.findIndex(el => el.id == req.params.id);
  if(index != -1){
	db[index] = {id: req.params.id, author: req.body.author, text: req.body.text };
	res.json({message: 'OK'});  
  }
   else res.json({message: 'Wrong id!'});
});

app.delete('/testimonials/:id', (req, res) => {
  const index  = db.findIndex(el => el.id == req.params.id);
  if(index != -1){
	db.splice(index,1);
	res.json({message: 'OK'});  
  }
   else res.json({message: 'Wrong id!'});
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

app.listen(7000, () => {
  console.log('Server is running on port: 7000');
});