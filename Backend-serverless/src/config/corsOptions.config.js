export const corsOptions = {
  origin: process.env.ORIGIN, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Set-Cookie"],   //Allow client to receive Set-Cookie headers
  optionsSuccessStatus: 200,        //Ensure older browsers don’t fail on 204
};
