import dotenv from "dotenv";
dotenv.config();
export const env = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.DB_URL,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};
