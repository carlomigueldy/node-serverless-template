import expressWinston from "express-winston";
import serverless from "serverless-http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import winston from "winston";
import session from "express-session";
import router from "./routes";
import cors from "cors";

import { config } from "./config";
import { getLogger } from "./utils";
import { Wallet } from "ethers";

const log = getLogger("handler");
const app = express();

/**
 * database
 */
mongoose
  .connect(config.MONGODB_URI, { tlsInsecure: true })
  .then((response) => {
    log.verbose("mongodb connected", response.models);
  })
  .catch((error) => {
    log.error("mongodb connection error", error);
  });

/**
 * http
 */
app.use(cors());

/**
 * auth
 */
app.use(
  session({
    secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * utils
 */
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

/**
 * endpoints
 */
app.get("/", (_, response) => {
  return response.status(200).json({
    message: "carlomigueldy.eth says OK!",
    server: !!process.env.PRIVATE_KEY
      ? new Wallet(process.env.PRIVATE_KEY).address
      : undefined,
  });
});

app.use(router);

app.use((_, response) => {
  return response.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
