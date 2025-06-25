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
  import {limiter} from "./src/config/rateLimiter.config.js"
  import { notFoundHandler } from "./src/utils/404Handler.utils.js";
  import {morganMiddleware} from "./src/middlewares/logger.middleware.js";

  const app = express();
  dotenv.config();



  // // Body Parser Middleware
  // app.use(express.json({limit: "10kb" }));
  // app.use(express.urlencoded({ extended: true, limit: "10kb"  }));

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

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cookieParser());

  // CORS Configuration
  app.use(cors(corsOptions));

  // Set security HTTP headers
  app.use(helmet());

  // Prevent HTTP Parameter Pollution
  app.use(hpp()); 

  // Data sanitization against NoSQL query injection
  // app.use(mongoSanitize(mongoSanitizeOptions));

  // Data sanitization against XSS
  // app.use(xss()); 

  // loogging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morganMiddleware());
  }

  // Apply rate limiting to all routes
  app.use("/api/v1", limiter);

  // Importing routes
  connectDB();

  import router from "./routes.js";
  app.use(router);


  // handling 404-notFound error
  app.use(notFoundHandler);
  app.use(errorHandler);


  export {app};
