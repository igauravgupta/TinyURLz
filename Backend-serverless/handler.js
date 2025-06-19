import serverless from "serverless-http";
import {app} from "./app.js";

export const handler = serverless(app, {
  request: (request, event, context) => {
    console.log("RAW EVENT BODY:", event.body);
  }
});

