var express = require('express');
var router = express.Router();
var Order = require('../models/Order');
var wrapErrors = require('../utils/wrapErrors');
/**
 * Scans the entire table for items.
 */
router.get(
  '/',
  wrapErrors(async (req, res) => {
    var data = await Order.query({});
    res.status(200).json({ data });
  })
);
/**
 * Creates a new item.
 */
router.post(
  '/',
  wrapErrors(async (req, res) => {
    var data = await Order.create(req.body);
    res.status(200).json({ data });
  })
);
/**
 * Delets an item by id.
 */
router.delete(
  '/:id',
  wrapErrors(async (req, res) => {
    var id = req.params.id;
    var data = await Order.delete({ id });
    res.status(200).json({ data });
  })
);
/**
 * Gets a single item from the table
 */
router.get(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Order.get({ id: req.param.id });
    res.status(200).json({ data });
  })
);
/**
 * Updates an item.
 */
router.put(
  '/:id',
  wrapErrors(async (req, res) => {
    var data = await Order.update(req.body);
    res.status(200).json({ data });
  })
);

/**
 * Gets the items in the category index
 */
router.get(
  '/category/:id',
  wrapErrors(async (req, res) => {
    var data = await Product.query({
      indexName: 'category',
      keyCondition: {
        values: [{ ':id': req.params.id }],
        expression: '#key = :id'
      }
    });
    res.status(200).json({ data });
  })
);

module.exports = router;
