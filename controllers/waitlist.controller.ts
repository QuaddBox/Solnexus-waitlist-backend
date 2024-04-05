import { NextFunction, Request, Response } from "express";
import { testService } from "../services/test.service";
import { AppDataSource } from "../src/data-source";
import { Waitlist } from "../src/entity/Waitlist";
import { send } from "../mails/mailer";
import { env } from "../config";
import { ObjectId } from "mongodb";
const addToWaitlistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  if (!body.email || body.email == "") {
    return res.status(402).json({ message: "Email required" });
  }
  const emailInDb = await Waitlist.findOneBy({
    email: body.email,
  });
  if (emailInDb) {
    return res.status(402).json({ message: "Email already in waitlist" });
  }
  const waitlist = new Waitlist();
  waitlist.email = body.email;
  waitlist.save();
  await send(
    "noreply@solnexus.com",
    env.EMAIL_TO,
    "User registered",
    `User ${waitlist.email} waitlisted`
  );
  return res.status(200).json({ message: "Email waitlisted" });
};

const fetchAllWaitList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allWaitListers = await Waitlist.find();
  return res.status(200).json({ results: allWaitListers });
};

const deleteWaitList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);
  const waitLister = await Waitlist.findOneBy({
    _id: new ObjectId(req.params["id"]),
  } as any);
  console.log(waitLister);

  if (!waitLister) {
    return res.status(404).json({ message: "Not found" });
  }
  const deleted = await Waitlist.delete(waitLister.id);
  return res
    .status(200)
    .json({ results: deleted.raw.acknowledged ? waitLister : null });
};

export { addToWaitlistController, fetchAllWaitList, deleteWaitList };
