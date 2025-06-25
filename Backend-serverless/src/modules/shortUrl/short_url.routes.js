import express from 'express';
import { createShortUrl,deleteShortUrl, verifyPassword } from './short_url.controllers.js';
import { authMiddleware } from "../../middlewares/auth.middleware.js"
const router = express.Router();

router.post("/",authMiddleware,createShortUrl);
router.delete("/delete/:id",authMiddleware,deleteShortUrl);
router.post("/verifyPassword/:id",verifyPassword);

export default router;