import database from "../../services/database";

async function query(context) {
  const binds = {};

  let consultaSql = `SELECT  PCPEDC.CODSUPERVISOR, PCSUPERV.NOME,`;
  consultaSql += `\nSUM(DECODE(PCPEDC.CONDVENDA,5, 0 ,6, 0, 11, 0, 12, 0 ,PCPEDC.VLATEND  )) VENDA,`;
  consultaSql += `\nMAX(NVL((SELECT SUM(NVL(PCMETASUP.VLVENDAPREV,0)) FROM PCMETASUP  WHERE 0 = 0`;
  consultaSql += `\nAND PCMETASUP.DATA BETWEEN :dataIni AND :dataFim`;
  consultaSql += `\nAND PCMETASUP.CODFILIAL IN ('4','5')`;
  consultaSql += `\nAND PCMETASUP.CODSUPERVISOR = PCPEDC.CODSUPERVISOR),0) ) META`;
  consultaSql += `\nFROM  PCSUPERV, PCUSUARI, PCPLPAG, PCPEDC`;
  consultaSql += `\n,  (SELECT C.CODSUPERVISOR CODSUP, COUNT(DISTINCT(PCPEDI.CODPROD)) QTDE`;
  consultaSql += `\nFROM PCPEDI, PCPEDC C `;
  consultaSql += `\nWHERE NVL(PCPEDI.BONIFIC, 'N') = 'N'`;
  consultaSql += `\nAND c.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)`;
  consultaSql += `\nAND C.DTCANCEL IS NULL`;
  consultaSql += `\nAND PCPEDI.DATA BETWEEN :dataIni AND :dataFim`;
  consultaSql += `\nAND C.NUMPED = PCPEDI.NUMPED`;
  consultaSql += `\nAND PCPEDI.DATA = C.DATA`;
  consultaSql += `\nAND C.CODFILIAL IN ('4','5')`;
  consultaSql += `\nGROUP BY C.CODSUPERVISOR) MIX_SUPERV`;
  consultaSql += `\nWHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG`;
  consultaSql += `\nAND PCPEDC.CODUSUR = PCUSUARI.CODUSUR`;
  consultaSql += `\nAND PCPEDC.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR(+)`;
  consultaSql += `\nAND MIX_SUPERV.CODSUP = PCPEDC.CODSUPERVISOR`;
  consultaSql += `\nAND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)`;
  consultaSql += `\nAND PCPEDC.DTCANCEL IS NULL`;
  consultaSql += `\nAND PCPEDC.DATA BETWEEN :dataIni AND :dataFim`;
  consultaSql += `\nAND PCPEDC.CODFILIAL IN ('4','5')`;

  if (context.tipocargo === "G") {
    consultaSql += `\nAND PCPEDC.codsupervisor in (7,17,20,21,22,23)`;
  } else {
    if (context.codsuperv == 23) {
      consultaSql += `\nAND PCPEDC.codsupervisor in (21,23)`;
    } else {
      binds.codsuperv = context.codsuperv;
      consultaSql += `\nAND PCPEDC.codsupervisor in (:codsuperv)`;
    }
  }

  consultaSql += `\nGROUP BY PCPEDC.CODSUPERVISOR, PCSUPERV.NOME, MIX_SUPERV.QTDE`;
  consultaSql += `\nORDER BY PCPEDC.CODSUPERVISOR DESC`;

  if (context.dataIni && context.dataFim) {
    binds.dataIni = context.dataIni;
    binds.dataFim = context.dataFim;
  }

  console.log(context);
  console.log(consultaSql);
  console.log(binds);
  const result = await database.simpleExecute(consultaSql, binds);
  console.log(result.rows.length);
  return result.rows;
}

module.exports.query = query;
