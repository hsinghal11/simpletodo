const zod = require("zod");
/**
 *  {
 *      title: string,
 *      description: string,
 *  }
 *  update: will do Mark as Done :)
 *  {
 *      id: String,
 *  }
 */

const createTodo = zod.object({
    title: zod.string().min(1),
    description: zod.string().min(1)
})

const updateTodo = zod.object({
    id: zod.string()
})

const deleteTodo = zod.object({
    id: zod.string()
})

module.exports={
    createTodo: createTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
}