import jwt from "jsonwebtoken";

import { promisify } from "util";

import authConfig from "../../config/authconfig";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // caso a informação nao venha, enviar mensagem

  if (!authHeader) {
    return res.status(401).json({ error: "Token nao enviado!" });
  }

  // extrair o token da informação vinda da requisição

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token não preenchido" });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.matricula = decoded.matricula;
    req.codusur = decoded.codusur;
    req.tipocargo = decoded.tipocargo;
    req.codsuperv = decoded.codsuperv;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token Invalido " });
  }
};
