import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get

// post
router.post("/idle", IndexController.TalentPlacement.createSwitchIdle,
    IndexController.TalentPlacement.UpdateStatus
);

export default router;