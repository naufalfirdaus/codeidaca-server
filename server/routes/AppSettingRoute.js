import { Router } from 'express';
import IndexController from '../controller/IndexController'
import UploadDownloadHelper from '../helpers/UploadDownloadHelper'

const router = Router()

// router.post("/", UploadDownloadHelper.uploadMultipleFile, IndexController.AppSettingController.createData)
router.get("/:id", IndexController.AppSettingController.findById)
router.get("/resume/:filename", UploadDownloadHelper.showFile)
router.get("/images/:filename", UploadDownloadHelper.showProductImage);

//router.put("/:id", UploadDownloadHelper.uploadMultipleFile, IndexController.AppSettingController.updateTalent2)
router.put("/:id",  UploadDownloadHelper.uploadSingleFile,IndexController.AppSettingController.updateTalent)
router.put("/data/:id", IndexController.AppSettingController.updateTalentNoFile)


export default router;