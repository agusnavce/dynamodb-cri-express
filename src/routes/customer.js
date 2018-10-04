var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
var wrapErrors = require('../utils/wrapErrors');

/**
 * Scans the entire table for items.
 */
router.get(
  '/',
  wrapErrors(async (req, res) => {
    var data = await Customer.query({});
    res.status(200).json({ data });
  })
);
/**
 * Creates a new item.
 */
router.post(
  '/',
  wrapErrors(async (req, res) => {
    var data = await Customer.create(req.body);
    res.status(200).json({ data });
  })
);
/**
 * Delets an item by id.
 */
router.delete(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Customer.delete({ id: req.params.id });
    res.status(200).json({ data });
  })
);
/**
 * Gets a single item from the table
 */
router.get(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Customer.get({ id: req.param.id });
    res.status(200).json({ data });
  })
);
/**
 * Updates an item.
 */
router.put(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Customer.update(req.body);
    res.status(200).json({ data });
  })
);

module.exports = router;
