var express = require('express');
var router = express.Router();
var Employee = require('../models/Employee');
/**
 * Scans the entire table for items.
 */
router.get('/', async (req, res) => {
  var data = await Employee.query({});
  res.status(200).json({ data: data.item });
});
/**
 * Creates a new item.
 */
router.post('/', async (req, res) => {
  var data = await Employee.create(req.body);
  res.status(200).json({ data });
});
/**
 * Delets an item by id.
 */
router.delete('/:id', async (req, res) => {
  var data = await Employee.delete({ id: req.params.id });
  res.status(200).json({ data });
});
/**
 * Gets a single item from the table
 */
router.get('/:id', async (req, res) => {
  var data = await Employee.get({ id: req.param.id });
  res.status(200).json({ data: data.item });
});
/**
 * Updates an item.
 */
router.put('/:id', async (req, res) => {
  var data = await Employee.update(req.body);
  res.status(200).json({ data: data.item });
});

module.exports = router;
