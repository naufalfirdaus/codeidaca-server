import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get
router.get("/",IndexController.CandidateController.findCandidate);
router.get("/applied",IndexController.CandidateController.findCandidateApply);
router.get("/filtering",IndexController.CandidateController.findCandidateFiltering);
router.get("/contract",IndexController.CandidateController.findCandidateContract);
router.get("/briefing",IndexController.CandidateController.findCandidateBriefing);
router.get("/join",IndexController.CandidateController.findCandidateJoin);

// put
router.put("/:id",IndexController.CandidateController.UpdateTimelineStatus,IndexController.CandidateController.createRowTimeline);

export default router;