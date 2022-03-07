import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get

router.get("/", IndexController.CurriculumController.findAllRows);
router.get("/regular", IndexController.CurriculumController.findRegular);
router.get("/berbayar", IndexController.CurriculumController.findBerbayar);
export default router;