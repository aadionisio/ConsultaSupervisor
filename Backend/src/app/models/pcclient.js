import database from "../../services/database";

async function query(context) {
  const consultaSql =
    "select c.codcli, c.cliente, c.dtexclusao  from pcclient c where c.codcli = :codcli and c.codusur1 = :codusur";
  const binds = {};

  if (context.codcli) {
    binds.codcli = context.codcli;
  }

  if (context.codusur) {
    binds.codusur = context.codusur;
  }

  const result = await database.simpleExecute(consultaSql, binds);

  return result.rows;
}

module.exports.query = query;
