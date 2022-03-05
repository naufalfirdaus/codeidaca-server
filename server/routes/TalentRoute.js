import { Router } from "express";
import IndexController from "../controller/IndexController";
import UploadDownloadHelper from "../helpers/UploadDownloadHelper";

const router = Router();
router.get("/", IndexController.TalentContoller.findAllRows)
router.get("/bysql", IndexController.TalentContoller.findBySql)
router.get("/list", IndexController.TalentContoller.findBatch)
router.get("/talent", IndexController.TalentContoller.findTalent)
router.get("/images/:filename", UploadDownloadHelper.showProductImage)

export default router;