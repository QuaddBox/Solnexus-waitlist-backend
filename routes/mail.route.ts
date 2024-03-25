import { Router } from "express";
import { sendMailToAllWaitlistUsers } from "../controllers/mail.controller";

const mailerRouter: Router = Router();

// Route Path
const path: string = "/mails";

mailerRouter.post(path, sendMailToAllWaitlistUsers)

export default mailerRouter;
