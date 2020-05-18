import pcclient from "../models/pcclient";

async function index(req, res, next) {
  try {
    const context = {};

    context.codcli = parseInt(req.query.codcli, 10);
    context.codusur = parseInt(req.query.codusur, 10);

    const rows = await pcclient.query(context);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports.index = index;
