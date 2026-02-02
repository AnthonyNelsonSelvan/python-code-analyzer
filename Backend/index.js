import express from "express";
import validateRouter from "./routes/validate.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/validate", validateRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("server started");
});
