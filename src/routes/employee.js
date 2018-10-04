var express = require('express');
var router = express.Router();
var Employee = require('../models/Employee');
var wrapErrors = require('../utils/wrapErrors');
/**
 * Scans the entire table for items.
 */
router.get(
  '/',
  wrapErrors(async (req, res) => {
    var data = await Employee.query({});
    res.status(200).json({ data: data.item });
  })
);
/**
 * Creates a new item.
 */
router.post(
  '/',
  wrapErrors(async (req, res) => {
    var data = await Employee.create(req.body);
    res.status(200).json({ data });
  })
);
/**
 * Delets an item by id.
 */
router.delete(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Employee.delete({ id: req.params.id });
    res.status(200).json({ data });
  })
);
/**
 * Gets a single item from the table
 */
router.get(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Employee.get({ id: req.param.id });
    res.status(200).json({ data: data.item });
  })
);
/**
 * Updates an item.
 */
router.put(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Employee.update(req.body);
    res.status(200).json({ data: data.item });
  })
);

/**
 * Get the confidential info of an employee.
 */
router.get(
  '/conf/:id',
  wrapErrors(async (req, res) => {
    var data = await Employee.getConfidential(req.params.id);
    res.status(200).json({ data: data.item });
  })
);

/**
 * Creates a new item in confidential index.
 */
router.post(
  '/conf',
  wrapErrors(async (req, res) => {
    var data = await Employee.createConfidential(req.body);
    res.status(200).json({ data });
  })
);

/**
 * Updates the conf.
 */
router.put(
  '/conf',
  wrapErrors(async (req, res) => {
    var data = await Customer.updateConfidential(req.body);
    res.status(200).json({ data: data.item });
  })
);

module.exports = router;
