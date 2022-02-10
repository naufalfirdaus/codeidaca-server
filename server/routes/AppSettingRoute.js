import { Router } from 'express';
import IndexController from '../controller/IndexController'
import UploadDownloadHelper from '../helpers/UploadDownloadHelper'

const router = Router()

router.post("/", UploadDownloadHelper.uploadMultipleFile, IndexController.AppSettingController.createData)
router.get("/:id", IndexController.AppSettingController.findById)
router.put("/:id", IndexController.AppSettingController.updateTalent)


export default router;