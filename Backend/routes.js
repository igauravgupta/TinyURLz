import{Router} from "express";
const router = Router();


// Importing routes

import authRoutes from "./src/modules/auth/auth.routes.js";
import userRoutes from "./src/modules/user/user.routes.js";
import short_urlRoutes from "./src/modules/shortUrl/short_url.routes.js";
import {redirectFromShortUrl} from "./src/modules/shortUrl/short_url.controllers.js";
router.use("/api/user",userRoutes)
router.use("/api/auth",authRoutes)
router.use("/api/urls",short_urlRoutes)
router.get("/:id",redirectFromShortUrl)


export default router;