import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get
router.get("/:id", IndexController.TalentDetail.findTalentReview)



export default router;