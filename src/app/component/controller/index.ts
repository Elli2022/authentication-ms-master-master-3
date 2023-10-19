import { logger } from "../../libs/logger";
const baseUrl = "/api/v1";

const get = (req, res) => res.json({ data: "Hello, world!" });
const post = (req, res) => res.json({ data: req.body });

const routes = [
  { path: `${baseUrl}/`, method: "get", component: get },
  { path: `${baseUrl}`, method: "post", component: post },
];

export { routes };
