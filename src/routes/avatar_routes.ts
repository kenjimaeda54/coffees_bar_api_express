import { Router } from "express";
import avatarsController from "../controlers/AvatarsController";

const router = Router();

router.get("/", avatarsController.returnAllImages);
router.get("/:id", avatarsController.returnSingleAvatar);

export default router;
