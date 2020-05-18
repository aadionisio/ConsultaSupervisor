import oracledb from "oracledb";
import database from "../../services/database";

async function insert(context) {
  let comandoSql = `insert into pcdesconto`;
  comandoSql += `(coddesconto,codcli,codprod,percdesc,dtinicio,dtfim,codusur,basecreddebrca,utilizadescrede,codfunclanc`;
  comandoSql += `,datalanc,codfuncultalter,dataultalter,origemped,aplicadesconto,creditasobrepolitica,tipo,alteraptabela`;
  comandoSql += `,prioritaria,questionausoprioritaria,codfilial,apenasplpagmax`;
  comandoSql += `,aplicadescsimplesnacional,prioritariageral,consideracalcgiromedic,percdescmax,qtdaplicacoesdesc,qtminestparadesc`;
  comandoSql += `,tipocontacorrente,percfornec,perccustfornec )`;
  comandoSql += `Values (`;
  comandoSql += `DFSEQ_PCDESCONTO.NEXTVAL,:CODCLI,:CODPROD,:PERCDESC,TRUNC(SYSDATE),TRUNC(SYSDATE),:CODUSUR,'S','N',:MATRICULA`;
  comandoSql += `,sysdate,:MATRICULA, trunc(sysdate), 'O', 'S','N','C','N','S','N',:CODFILIAL,'N','T','N','N',0,0,0,'R',0,0`;
  comandoSql += `) returning coddesconto into :coddesconto`;

  const pcdesconto = Object.assign({}, context);

  pcdesconto.coddesconto = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  };
  console.log(comandoSql);
  console.log(pcdesconto);

  const result = await database.simpleExecute(comandoSql, pcdesconto);

  pcdesconto.coddesconto = result.outBinds.coddesconto[0];

  return pcdesconto;
}

module.exports.insert = insert;
