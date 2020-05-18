import database from "../../services/database";

async function query(context) {
  const consultaSql =
    "select prod.codprod, prod.descricao, p.foralinha from pcprodfilial p, pcprodut prod where p.codprod = prod.codprod and p.codprod = :codprod and p.codfilial = :codfilial";
  const binds = {};

  if (context.codprod) {
    binds.codprod = context.codprod;
  }

  if (context.codfilial) {
    binds.codfilial = context.codfilial;
  }

  const result = await database.simpleExecute(consultaSql, binds);
  console.log(result.rows.length);
  return result.rows;
}

module.exports.query = query;
