import { Router } from "express";
import IndexController from "../controller/IndexController";
import UploadDownloadHelper from "../helpers/UploadDownloadHelper";

const router = Router();
router.get("/", IndexController.TestimoniController.findAllRows);
router.get("/bysql", IndexController.TestimoniController.findBySql);

export default router;
