import database from "../../services/database";

async function query(context) {
  const consultaSql =
    "select p.codigo, p.razaosocial from pcfilial p where p.codigo = :codfilial";
  const binds = {};

  if (context.codfilial) {
    binds.codfilial = context.codfilial;
  }

  const result = await database.simpleExecute(consultaSql, binds);

  return result.rows;
}

module.exports.query = query;
