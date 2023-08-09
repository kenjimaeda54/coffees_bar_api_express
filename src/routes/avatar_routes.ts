import { Router } from "express";
import avatarsController from "../controlers/AvatarsController";

const router = Router();

router.get("/", avatarsController.returnAllAvatars);
router.get("/:id", avatarsController.returnSingleAvatar);

export default router;
