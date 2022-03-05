import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get

router.get("/", IndexController.CurriculumController.findAllRows);
router.get("/:curr_type", IndexController.CurriculumController.findbyType)
// router.get("/:curr_type", IndexController.CurriculumController.findRegular);
// router.get("/:curr_type", IndexController.CurriculumController.findBerbayar);
// router.get("/:id",IndexController.CurriculumController.findbyId);

export default router;