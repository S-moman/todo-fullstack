import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db.js";
import todosRoutes from "./routes/todos.js";

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cors());

app.use('/todos', todosRoutes)

app.get("/", (req, res) => {
  res.json("Hello world (from server), lets get it started!!!");
});




app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  connectDB();
});
