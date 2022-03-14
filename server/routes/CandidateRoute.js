import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get
router.get("/",IndexController.CandidateController.findCandidate);

// put
router.put("/:id",IndexController.CandidateController.UpdateTimelineStatus,IndexController.CandidateController.createRowTimeline);

export default router;