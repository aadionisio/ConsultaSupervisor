import * as Yup from "yup";
import autdesconto from "../models/pcdesconto";

async function store(req, res, next) {
  // validando se os dados foram informados corretamente

  const schema = Yup.object().shape({
    codfilial: Yup.string().required(),
    codusur: Yup.string().required(),
    codcli: Yup.string().required(),
    codprod: Yup.string().required(),
    percdesc: Yup.string().required()
  });

  console.log(req.body.params);

  if (!(await schema.isValid(req.body.params))) {
    return res.status(400).json({ error: "Dados de entrada inválidos" });
  }

  try {
    const pcdesconto = {
      codcli: req.body.params.codcli,
      codprod: req.body.params.codprod,
      percdesc: req.body.params.percdesc,
      codusur: req.body.params.codusur,
      matricula: req.matricula,
      codfilial: req.body.params.codfilial
    };

    console.log(pcdesconto);
    const desconto = await autdesconto.insert(pcdesconto);

    res.status(201).json(desconto);
  } catch (err) {
    next(err);
  }
}

module.exports.store = store;
