import { Router } from "express";

import sessionController from "./app/controllers/sessionController";
import vendasupervisor from "./app/controllers/vendasupervisorController";
import vendarca from "./app/controllers/vendarcaController";
import pccliente from "./app/controllers/pcclientController";
import pcfilial from "./app/controllers/pcfilialController";
import pcusuari from "./app/controllers/pcusuariController";
import pcprodut from "./app/controllers/pcprodutController";
import pcdesconto from "./app/controllers/pcdescontoController";

import authMiddleware from "./app/middlewares/auth";

const router = new Router();

router.post("/sessions", sessionController.store);

// abaixo chamada do mid de autenticaçã oonde as rotas só serão executadas se o usuario tiver autenticado
router.use(authMiddleware);

// router.post("/sessions", sessionController.update);
router.get("/vendasupervisor", vendasupervisor.index);
router.get("/vendasupervisor/:codsuperv", vendarca.index);
router.get("/cliente", pccliente.index);
router.get("/filial", pcfilial.index);
router.get("/rca", pcusuari.index);
router.get("/produto", pcprodut.index);

router.post("/desconto", pcdesconto.store);

export default router;
