import express, { Express, Request, Response } from "express";
import waitlistRouter from "./routes/waitlist.route";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./src/data-source";
import { env } from "./config";
import { connectToDB } from "./database/db";
import mailerRouter from "./routes/mail.route";

async function bootstrap() {
  const app: Express = express();
  const PORT = process.env.PORT || 8080;

  app.use(express.json());
  app.use(cors<Request>());
  app.use(express.urlencoded({ extended: true }));

  //   app.get("/", (req: Request, res: Response) => {
  //     res.send("Express(Node) + Typescript");
  //   });

  app.use(waitlistRouter);
  app.use(mailerRouter);
await connectToDB();
  app.listen(env.PORT, async () => {

    console.log(`⚡️[server]: Server is running @ http://localhost:${PORT}`);
    
  });
}
bootstrap();
