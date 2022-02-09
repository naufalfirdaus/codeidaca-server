import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get
// router.get("/", IndexController.TalentPlacement.findAllRows);


// post
router.post("/", IndexController.TalentPlacement.getPlaceOrder,
    IndexController.TalentPlacement.createPlacement,
    IndexController.TalentPlacement.talenPlacement
);

export default router;