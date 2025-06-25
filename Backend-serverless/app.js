import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.config.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import { fileURLToPath } from "url";
import xss from "xss-clean";
import { corsOptions } from "./src/config/corsOptions.config.js";
import { errorHandler } from "./src/utils/errorHandler.utils.js";
import { limiter } from "./src/config/rateLimiter.config.js";
import { notFoundHandler } from "./src/utils/404Handler.utils.js";
import { morganMiddleware } from "./src/middlewares/logger.middleware.js";

dotenv.config();
const app = express();

// Set security HTTP headers
app.use(helmet());

// CORS Configuration
app.use(cors(corsOptions));

// Parse cookies
app.use(cookieParser());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize(mongoSanitizeOptions));

// Data sanitization against XSS
// app.use(xss()); 

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
    let data = [];
    req.on("data", chunk => data.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(data).toString();
      console.log("🔍 RAW BODY FROM LAMBDA:", raw);
      try {
        req.body = JSON.parse(raw);
      } catch (e) {
        req.body = {};
      }
      next();
    });
  });


// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morganMiddleware());
}

// Rate Limiting
app.use("/api/v1", limiter);

// DB Connect
connectDB();

// Routes
import router from "./routes.js";
app.use(router);

// 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export { app };


