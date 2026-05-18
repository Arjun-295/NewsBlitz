import "dotenv/config";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Note from "./models/Note.js";

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "pagination_demo",
  })
  .then(async () => {
    await Note.deleteMany();

    const notes = Array.from({ length: 200 }).map(() => ({
      userId: "691c37689f56948d5ad29ea4",
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
    }));

    await Note.insertMany(notes);
    console.log("Fake Notes added");
    process.exit();
  })
  .catch(console.error);
