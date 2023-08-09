import express, { Request, Response } from "express";
import cooffeRouter from "./src/routes/coufe_routes";
import avatarRouter from "./src/routes/avatar_routes";
import middlewareError from "./src/middleware/middlewareError";
import useRouter from "./src/routes/users_routes";
import cartRouter from "./src/routes/cart_routes";

class App {
  app;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {}

  routes() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/coffees", cooffeRouter);
    this.app.use("/avatars", avatarRouter);
    this.app.use("/users", useRouter);
    this.app.use("/carts", cartRouter);
    //middleware erros, precisa da lib express assync erros
    //tem que esta abaixo de arquivos de rotas
    this.app.use(middlewareError.error);
  }
}

export default new App().app;
