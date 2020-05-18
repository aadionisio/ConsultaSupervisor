import pcfilial from "../models/pcfilial";

async function index(req, res, next) {
  try {
    const context = {};

    context.codfilial = parseInt(req.query.codfilial, 10);

    const rows = await pcfilial.query(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.index = index;
