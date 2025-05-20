import express from 'express';
import { createShortUrl,deleteShortUrl } from './short_url.controllers.js';
import { authMiddleware } from "../../middlewares/auth.middleware.js"
const router = express.Router();

router.post("/",authMiddleware,createShortUrl);
router.delete("/delete/:id",authMiddleware,deleteShortUrl);

export default router;