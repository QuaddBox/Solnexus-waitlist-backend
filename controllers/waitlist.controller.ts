import { NextFunction, Request, Response } from "express";
import { testService } from "../services/test.service";
import { AppDataSource } from "../src/data-source";
import { Waitlist } from "../src/entity/Waitlist";

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

export { addToWaitlistController, fetchAllWaitList };
