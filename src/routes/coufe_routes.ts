import { Router } from "express";
import coffeController from "../controlers/CoffeController";

const router = Router();

router.get("/", coffeController.returnCoffees);
router.get("/:id", coffeController.returnSingleCoffees);

export default router;
