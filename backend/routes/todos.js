import express from 'express'

const router = express.Router()

import todoController from '../controllers/todos.js'


router.get('/', todoController.getTodos)

router.post('/', todoController.createTodo)

router.delete('/:id', todoController.deleteTodo)

router.put('/:id', todoController.updateTodos)




export default router