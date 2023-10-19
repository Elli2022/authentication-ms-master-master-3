import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import createServer from "./libs/express";
import { logger } from "../../libs/logger";

const app = express();

const server = ({ hostname, port }) => {
  createServer({
    json: express.json,
    urlencoded: express.urlencoded,
    app,
    handler: { routes: [] }, // Tillfällig lösning tills du har en faktisk handler.
    cors,
    compression,
    helmet,
    logger,
  }).server({ hostname, port });
};

export { server };
