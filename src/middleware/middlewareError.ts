import { Request, Response, NextFunction } from "express";

class ErrorMiddleware {
  //precisa passar os 4 parametros se nao vai dar erro
  async error(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Error) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export default new ErrorMiddleware();
