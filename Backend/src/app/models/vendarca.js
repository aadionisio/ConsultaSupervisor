import database from "../../services/database";

async function query(context) {
  let consultaSql = "SELECT PCPEDC.CODSUPERVISOR,";
  consultaSql += `\nPCSUPERV.NOME SUPERVISOR,`;
  consultaSql += `\nPCPEDC.CODUSUR,`;
  consultaSql += `\nPCUSUARI.NOME,`;
  consultaSql += `\nSUM(DECODE(PCPEDC.CONDVENDA,5,0,6,0,11,0,12,0,NVL(PCPEDC.VLATEND ,0)))VLVENDA,`;
  consultaSql += `\nMAX(NVL((SELECT SUM(NVL(PCMETARCA.VLVENDAPREV,0)) FROM PCMETARCA WHERE 0 = 0`;
  consultaSql += `\nAND PCMETARCA.DATA BETWEEN first_day(:dataIni) AND :dataFim`;
  consultaSql += `\nAND PCMETARCA.CODFILIAL IN ('4','5')`;
  consultaSql += `\nAND PCMETARCA.CODUSUR = PCPEDC.CODUSUR),0) ) VLVENDAPREV,COUNT (*) OVER() QTDLINHAS`;
  consultaSql += `\nFROM PCUSUARI, PCSUPERV, PCPLPAG, PCPEDC,`;
  consultaSql += `\n(SELECT CODUSUR, SUM(CLIENTES) CLIENTES FROM`;
  consultaSql += `\n(SELECT PCPEDC.DATA, PCPEDC.CODUSUR, COUNT(DISTINCT(PCPEDC.CODCLI)) CLIENTES`;
  consultaSql += `\nFROM PCPEDC WHERE PCPEDC.DTCANCEL IS NULL`;
  consultaSql += `\nAND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)`;
  consultaSql += `\nAND PCPEDC.DATA BETWEEN first_day(:dataIni) AND :dataFim`;
  consultaSql += `\nAND PCPEDC.CODFILIAL IN ('4','5')`;
  consultaSql += `\nGROUP BY PCPEDC.DATA, PCPEDC.CODUSUR ) VISITAS2`;
  consultaSql += `\nGROUP BY CODUSUR ) VISITAS`;
  consultaSql += `\nWHERE PCPEDC.CODPLPAG = PCPLPAG.CODPLPAG`;
  consultaSql += `\nAND PCPEDC.CODUSUR = VISITAS.CODUSUR(+)`;
  consultaSql += `\nAND PCPEDC.CODUSUR = PCUSUARI.CODUSUR`;
  consultaSql += `\nAND PCPEDC.CODSUPERVISOR = PCSUPERV.CODSUPERVISOR`;
  consultaSql += `\nAND PCPEDC.CODSUPERVISOR = :codsuperv`;
  consultaSql += `\nAND PCPEDC.CONDVENDA NOT IN (4, 8, 10, 13, 20, 98, 99)`;
  consultaSql += `\nAND PCPEDC.DTCANCEL IS NULL`;
  consultaSql += `\nAND PCPEDC.DATA BETWEEN first_day(:dataIni) AND :dataFim`;
  consultaSql += `\nAND PCPEDC.CODFILIAL IN ('4','5')`;
  consultaSql += `\nGROUP BY PCPEDC.CODSUPERVISOR, PCSUPERV.NOME,PCPEDC.CODUSUR, PCUSUARI.NOME`;
  consultaSql += `\nORDER BY PCPEDC.CODUSUR DESC`;

  const binds = {};

  if (context.codsuperv) {
    binds.codsuperv = context.codsuperv;
  }

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
