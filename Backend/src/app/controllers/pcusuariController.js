import pcusuari from "../models/pcusuari";

async function index(req, res, next) {
  try {
    const context = {};

    context.codusur = parseInt(req.query.codusur, 10);

    const rows = await pcusuari.query(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.index = index;
