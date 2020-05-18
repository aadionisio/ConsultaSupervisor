import pcempr from "../models/pcempr";

async function get(req, res, next) {
  try {
    const context = {};

    context.matricula = parseInt(req.params.id, 10);
    context.matricula2 = parseInt(req.params.id, 10);
    context.matricula3 = parseInt(req.params.id, 10);

    const rows = await pcempr.query(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
