import express from "express";
import { getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxos} from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);           
router.get("/:id", getBruxosById);
router.post("/", createBruxo);    
router.delete("/:id", deleteBruxo);
router.put("/:id", updateBruxos);


export default router;