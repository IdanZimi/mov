import { Router } from "express";
import codeBlockRouter from "../../modules/codeBlock/routes/codeBlock.routes.js";

const v1Router = Router();

v1Router.use('/codeblock', codeBlockRouter)

export default v1Router;