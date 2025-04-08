import app from "../src/app";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  // Convert Vercel's request/res to Express
  return app(req, res);
};
