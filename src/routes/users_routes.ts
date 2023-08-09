import { Router } from "express";
import usersController from "../controlers/UsersController";

const router = Router();

router.post("/sigin", usersController.createUser);
router.post("/login", usersController.validateUser);
router.post("/avatar", usersController.updateAvatar);
router.post("/name", usersController.updateName);

export default router;
