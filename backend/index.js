import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db.js";
import Todo from "./models/todo.js";

const app = express();

const port = process.env.PORT;

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello world (from server)");
});

app.get('/todos', async (req, res) => {
    try {
    const todos = await Todo.find({})
    res.status(200).json(todos)
    } catch(e){
        console.error(e.message)
        res.status(400).json({ error: e.message })
    }
    
})

app.post('/todos', async (req, res) => {
    try {
        console.log(req.body)
    const todo = await Todo.create(req.body)
    res.status(200).json(todo)
    } catch(e){
         console.error(e.message)
        res.status(400).json({ error: e.message })
    }
})

app.delete('/todos/:id', async (req, res) => {
    try{
        const response = await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json(response)
    } catch (e) {
        console.log(e.message)
        res.status(400).json({ error: e.message })
    }
})


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  connectDB();
});
