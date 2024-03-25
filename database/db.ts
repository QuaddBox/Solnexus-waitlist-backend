import { AppDataSource } from "../src/data-source";

export const connectToDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to db");
  } catch (e) {
    console.error(e.message);
  }
};
