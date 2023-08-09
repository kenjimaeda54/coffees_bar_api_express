import { Router } from "express";
import cartController from "../controlers/CartController";

const router = Router();

router.post("/", cartController.createCart);
router.get("/orders", cartController.returnCart);

export default router;
