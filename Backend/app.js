import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.config.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { corsOptions } from "./src/config/corsOptions.config.js";
import { errorHandler } from "./src/utils/errorHandler.utils.js";
const app = express();



dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(errorHandler);





app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});
