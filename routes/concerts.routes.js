const express = require('express');
const router = express.Router();

const Concert = require('../controllers/concert.controller');

router.route('/concerts').get( Concert.getAll);

router.route('/concerts/:id').get( Concert.getById);

router.route('/concerts').post( Concert.createNew);

router.route('/concerts/:id').put( Concert.update);

router.route('/concerts/:id').delete( Concert.remove);

module.exports = router;