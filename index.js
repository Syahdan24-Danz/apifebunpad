import express from "express";
import response from "./response.js";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  response(200, "", "Welcome to api bem feb unpad", res);
});

app.use("/api", router);

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  response(500, "", "Server Error", res);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
