import express from "express"
import Notecreation from "../controllers/Notecreation.js";
import protectroute from "../middleware/protectroute.js";
const router=express.Router();

router.post("/note",protectroute,Notecreation);

export default router