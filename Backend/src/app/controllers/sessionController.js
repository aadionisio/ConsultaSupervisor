import jwt from "jsonwebtoken";
import * as Yup from "yup";

import authConfig from "../../config/authconfig";
import pcempr from "../models/pcempr";

// criando metodo store
async function store(req, res) {
  // validando se os dados foram informados corretamente

  const schema = Yup.object().shape({
    usuario: Yup.string().required(),
    senha: Yup.string().required()
  });

  if (!(await schema.isValid(req.body))) {
    console.log(req.body);
    return res.status(400).json({ error: "Validacao de dados falhou." });
  }

  // capturando email e senha da requisição

  const { usuario, senha } = req.body;
  console.log(usuario);
  console.log(senha);
  // verificar se o usuario existe
  const context = {};

  context.nome_guerra = usuario;
  context.senhabd = senha;

  console.log("antes de exevutar a query");
  console.log(context);
  const user = await pcempr.query(context);
  console.log(user);
  // const user = await User.findOne({ where: { email } });

  // Verificar se o usuario existe e se a senha bate
  if (user.length === 0) {
    return res
      .status(401)
      .json({ error: "Usuario ou senha inválidos. Tente novamente!" });
  }

  // fazer a autenticação e retornar o token para o usuario (retornar id, name, email e token)
  const matricula = user[0].MATRICULA;
  const codusur = user[0].CODUSUR;
  const tipocargo = user[0].TIPOCARGO;
  const codsuperv = user[0].CODSUPERV;

  return res.json({
    user: {
      matricula,
      usuario,
      codusur,
      tipocargo,
      codsuperv
    },

    token: jwt.sign(
      { matricula, codusur, tipocargo, codsuperv },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn
      }
    )
  });

  // recuperando o id e name
}

module.exports.store = store;
