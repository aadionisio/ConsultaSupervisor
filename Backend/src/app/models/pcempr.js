import database from "../../services/database";

async function query(context) {
  let consultaSql =
    "select e.matricula , e.nome_guerra, e.codusur, e.tipocargo, (select s.codsupervisor from pcsuperv s where s.cod_cadrca = e.codusur) codsuperv from pcempr e where  e.senhabd is not null";
  const binds = {};
  console.log(consultaSql);
  console.log(context);
  if (context.matricula) {
    binds.matricula = context.matricula;

    consultaSql += `\nand matricula = :matricula`;
  }

  if (context.nome_guerra) {
    binds.nome_guerra = context.nome_guerra;

    consultaSql += `\nand nome_guerra = upper(:nome_guerra)`;
  }

  if (context.senhabd) {
    binds.senhabd = context.senhabd;

    consultaSql += `\nand decrypt(e.senhabd,e.nome_guerra) = upper(:senhabd)`;
  }

  console.log(context);
  console.log(consultaSql);
  console.log(binds);
  const result = await database.simpleExecute(consultaSql, binds);
  console.log(result.rows.length);
  return result.rows;
}

module.exports.query = query;
