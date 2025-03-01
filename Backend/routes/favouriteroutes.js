import express from "express"
import protectroute from "../middleware/protectroute.js";
import Favouritemessage from "../controllers/Favouritemessage.js";
import Deletefavmessage from "../controllers/Deletefavmessage.js";
const router=express.Router();

router.post("/true",protectroute,Favouritemessage);
router.post("/false",protectroute,Deletefavmessage)
export default router
