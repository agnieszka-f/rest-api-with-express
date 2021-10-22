const express = require('express');
const router = express.Router();

const Seat = require('../controllers/seat.controller'); 

router.route('/seats').get( Seat.getAll);

router.route('/seats/:id').get( Seat.getById);

router.route('/seats').post( Seat.createNew);

router.route('/seats/:id').put( Seat.update);

router.route('/seats/:id').delete( Seat.remove);

module.exports = router;