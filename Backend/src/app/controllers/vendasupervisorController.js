import vendasupervisor from "../models/vendasupervisor";

// criando metodo store
async function index(req, res) {
  // validando se os dados foram informados corretamente
  /*
  const schema = Yup.object().shape({
    dtinicial: Yup.string().required(),
    dtfinal: Yup.string().required(),
    codsuperv: Yup.string().required()
  });

  if (!(await schema.isValid(req.body))) {
    console.log(req.body);
    return res.status(400).json({ error: "Validacao de dados falhou." });
  } */

  // capturando email e senha da requisição

  //  const { usuario, senha } = req.body;
  //  console.log(usuario);
  //  console.log(senha);
  // verificar se o usuario existe
  const context = {};

  context.tipocargo = req.tipocargo;
  context.dataIni = req.query.dataIni;
  context.dataFim = req.query.dataFim;
  context.codsuperv = req.codsuperv;

  console.log("antes de exevutar a query");
  console.log(context);
  const vendas = await vendasupervisor.query(context);
  //  console.log(user);
  // const user = await User.findOne({ where: { email } });

  // Verificar se o usuario existe e se a senha bate
  if (vendas.length === 0) {
    return res
      .status(401)
      .json({ error: "Nenhum resultado para o periodo selecionado!" });
  }

  return res.json(vendas);

  // recuperando o id e name
}

module.exports.index = index;
