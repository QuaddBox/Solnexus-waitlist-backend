import { NextFunction, Request, Response } from "express";
import { testService } from "../services/test.service";
import { AppDataSource } from "../src/data-source";
import { Waitlist } from "../src/entity/Waitlist";
import { sendMany } from "../mails/mailer";
import { env } from "../config";

const sendMailToAllWaitlistUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { from, subject, body } = req.body;
  if (!from || !subject || !body) {
    return "Fill all fields";
  }
  const all = (await Waitlist.find()).map((waitlister) => waitlister.email);
  const messages = await sendMany(from, all, subject, body);
  const failed = messages.filter((message) => message.success == false).length;
  const succeded = messages.filter((message) => message.success == true).length;
  return res.status(200).send({ succeded, failed });
};

export { sendMailToAllWaitlistUsers };
