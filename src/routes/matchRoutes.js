const express = require("express");

const matchDocuments = require("../services/matchService");

const router = express.Router();

router.get("/:poNumber", async (req, res) => {

  const result = await matchDocuments(req.params.poNumber);

  res.json(result);

});

module.exports = router;