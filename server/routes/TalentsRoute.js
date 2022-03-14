import { Router } from "express";
import IndexController from "../controller/IndexController";
import UploadDownloadHelper from "../helpers/UploadDownloadHelper";

const router = Router();

// get
router.get("/",IndexController.TalentsController.findTalent);
router.get("/images/:filename", UploadDownloadHelper.showTalentPhoto);

export default router;