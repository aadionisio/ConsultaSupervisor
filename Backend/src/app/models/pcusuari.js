import database from "../../services/database";

async function query(context) {
  const consultaSql =
    "select u.codusur, u.nome, u.dttermino from pcusuari u where u.codusur = :codusur";
  const binds = {};

  if (context.codusur) {
    binds.codusur = context.codusur;
  }

  const result = await database.simpleExecute(consultaSql, binds);
  console.log(result.rows.length);
  return result.rows;
}

module.exports.query = query;
