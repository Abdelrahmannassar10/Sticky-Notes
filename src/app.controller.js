import { connectDB } from "./DB/connection.js";
import US from './modules/user/user.controller.js';
import NS from './modules/note/note.controller.js';
import dotenv from "dotenv";
dotenv.config();
export function bootstrap(express, app) {
  app.use(express.json());
  connectDB();
  app.use("/users", US);
  app.use("/notes", NS);
};