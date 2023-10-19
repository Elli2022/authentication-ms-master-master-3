import express from "express";

interface ServerOptions {
  json: typeof express.json;
  urlencoded: typeof express.urlencoded;
  app: express.Express;
  handler: { routes: any[] }; // Justera denna typ beroende på dina behov.
  cors: any;
  compression: any;
  helmet: any;
  logger: any; // Eller den specifika typen för din logger.
}

export default function createServer(options: ServerOptions) {
  return Object.freeze({ server });

  function server({ hostname = "localhost", port = 3000 }) {
    // Tillför standardvärden
    // const routes = handler.routes; // Eftersom detta inte används, kommenterar vi bort det.

    options.app.use(options.helmet());
    options.app.options("*", options.cors({ credentials: true, origin: true }));
    options.app.use(options.cors());
    options.app.use(options.compression());
    options.app.use(options.json());
    options.app.use(options.urlencoded({ extended: true }));

    options.app.get("/", (req, res) => res.json({ data: "fitta" }));
    options.app.post("/", (req, res) => res.json({ body: req.body }));

    options.app.listen(port, hostname, () => {
      options.logger.info(
        `[EXPRESS] Server running at http://${hostname}:${port}`
      );
      return;
    });
  }
}

// export default function createServer({
//   json,
//   urlencoded,
//   app,
//   handler,
//   cors,
//   compression,
//   helmet,
//   logger,
// }) {
//   return Object.freeze({ server });

//   function server({ hostname, port }) {
//     const routes = handler.routes;
//     app.use(helmet());
//     app.options("*", cors({ credentials: true, origin: true }));
//     app.use(cors());
//     app.use(compression());
//     app.use(json());
//     app.use(urlencoded({ extended: true }));

//     app.get("/", (req, res) => res.json({ data: "Hello, world!" }));

//     app.listen(port, hostname, () => {
//       logger.info(`[EXPRESS] Server running at http://${hostname}:${port}`);
//       return;
//     });
//   }
// }
