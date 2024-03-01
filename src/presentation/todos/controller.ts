import { Request, Response } from "express"


const todos = [
    { id: 1, text: 'Buy milk', completeAt: new Date() },
    { id: 2, text: 'Buy Pan', completeAt: null },
    { id: 3, text: 'Buy leche', completeAt: new Date() },
];

export class TodosController {


    //*DI
    constructor() { };


    public getTodos = (req: Request, res: Response) => {

        return res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` });
    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' });
        const newTodo = {
            id: todos.length + 1,
            text: text,
            completeAt: null
        };

        todos.push(newTodo);

        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });

        const { text, completeAt } = req.body;
        //  if (!text) return res.status(400).json({ error: 'Text property is required' });

        todo.text = text || todo.text;
        (completeAt === 'null')
            ? todo.completeAt = null
            : todo.completeAt = new Date(completeAt);

        res.json(todo);

    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const index = todos.findIndex(todo => todo.id === id);
        //if (!index) return res.status(404).json({ error: `Todo with id ${id} not found` }); // no entra el if.
        if (index === -1) return res.status(404).json({ error: `Todo with id ${id} not found` });

        todos.splice(index, 1);
        res.json({ message: `Todo with id ${id} has been deleted` });
    }

}