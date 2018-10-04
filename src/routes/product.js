var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var wrapErrors = require('../utils/wrapErrors');

/**
 * Queries the products for all the items.
 */
router.get(
  '/',
  wrapErrors(async (req, res) => {
    var data = await Product.query({});
    res.status(200).json({ data: data.item });
  })
);
/**
 * Creates a new item.
 */
router.post(
  '/',
  wrapErrors(async (req, res) => {
    var data = await Product.create(req.body);
    res.status(200).json({ data });
  })
);
/**
 * Delets an item by id.
 */
router.delete(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Product.delete({ id: req.params.id });
    res.status(200).json({ data });
  })
);
/**
 * Gets a single item from the table
 */
router.get(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Product.get({ id: req.param.id });
    res.status(200).json({ data: data.item });
  })
);
/**
 * Updates an item.
 */
router.put(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Product.update(req.body);
    res.status(200).json({ data: data.item });
  })
);

/**
 * Gets the items in the category index
 */
router.get(
  '/employee/:id',
  wrapErrors(async (req, res) => {
    var data = await Product.query({
      indexName: 'employeeId',
      keyCondition: {
        values: [{ ':id': req.params.id }],
        expression: '#key = :id'
      }
    });
    res.status(200).json({ data: data.item });
  })
);

module.exports = router;
