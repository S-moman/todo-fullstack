import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db.js";
import todosRoutes from "./routes/todos.js";

const app = express();

const port = 8080;

app.use(express.json())
app.use(cors());
app.use('/todos', todosRoutes)

app.get("/", (req, res) => {
  res.json("Hello world (from server)");
});




app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  connectDB();
});
