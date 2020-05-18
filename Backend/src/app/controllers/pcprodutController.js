import pcprodut from "../models/pcprodut";

async function index(req, res, next) {
  try {
    const context = {};

    context.codprod = parseInt(req.query.codprod, 10);
    context.codfilial = parseInt(req.query.codfilial, 10);

    const rows = await pcprodut.query(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.index = index;
