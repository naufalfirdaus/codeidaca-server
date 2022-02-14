import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get
router.get("/",IndexController.BatchController.findBatch);

// put
router.put("/:id",IndexController.BatchController.UpdateBatch,IndexController.BatchController.UpdateMembers);
router.put("/status/:id",IndexController.BatchController.UpdateBatchStatus)

// delete
router.delete("/:id",IndexController.BatchController.deleteBatch);

export default router;