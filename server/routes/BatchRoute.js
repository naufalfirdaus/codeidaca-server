import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get
router.get("/",IndexController.BatchController.findBatch);
router.get("/new",IndexController.BatchController.findBatchNew);
router.get("/running",IndexController.BatchController.findBatchRunning);
router.get("/closed",IndexController.BatchController.findBatchClosed);

// put
router.put("/:id",IndexController.BatchController.UpdateBatch,IndexController.BatchController.UpdateMembers);
router.put("/status/:id",IndexController.BatchController.UpdateBatchStatus)

export default router;