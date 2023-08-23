import { Request, Response, Router } from "express";
import { getLogger } from "../utils";

const log = getLogger("auth.routes");
const router = Router();

router.get(`/carlomigueldy`, async (request, response) => {
  return response.status(200).json({ message: "working" });
});

export { router };
