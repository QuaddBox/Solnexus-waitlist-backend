import { Router } from "express";
import {
  addToWaitlistController,
  deleteWaitList,
  fetchAllWaitList,
} from "../controllers/waitlist.controller";

const waitlistRouter: Router = Router();

// Route Path
const path: string = "/waitlist";

waitlistRouter.post(path, addToWaitlistController);
waitlistRouter.get(path, fetchAllWaitList);
waitlistRouter.delete(path + "/:id", deleteWaitList);

export default waitlistRouter;
