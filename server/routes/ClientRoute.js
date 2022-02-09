import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get
router.get("/", IndexController.ClientController.findNameClient);


// post
// router.post("/", IndexController.TalentPlacement.getPlaceOrder, IndexController.TalentPlacement.createPlacement);

export default router;