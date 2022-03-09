import { Router } from "express";
import IndexController from "../controller/IndexController"
import UploadDownloadHelper from "../helpers/UploadDownloadHelper"
import UserController from "../controller/UserController";

const router = Router();

router.post("/",
    // UserController.signin,    
    UploadDownloadHelper.uploadMultipleFile,
    IndexController.talentController.createTalent
);

export default router;