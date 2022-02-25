import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// get
router.get("/", IndexController.ClientController.findNameClient);
router.get("/:id", IndexController.ClientController.findClient);

export default router;