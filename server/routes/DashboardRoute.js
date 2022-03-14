import { Router } from "express";
import IndexController from "../controller/IndexController";


const router = Router();
router.get("/", IndexController.DashboardController.summaryCandidate)
router.get("/applicant", IndexController.DashboardController.ApplicantByMonth)
router.get("/interest", IndexController.DashboardController.InterestTechnology)
router.get("/boardvidle", IndexController.DashboardController.BoardingIdle)
router.get("/universitas", IndexController.DashboardController.Universitas)
router.get("/pendidikan", IndexController.DashboardController.Pendidikan)
router.get("/jurusan", IndexController.DashboardController.Jurusan)

export default router;