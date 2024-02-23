import { Request, Response } from "express"


export class TodosController {


    //*DI
    constructor() { }


    public getTodos = (req: Request, res: Response) => {

        return res.json([
            { id: 1, text: 'Buy milk', createdAt: new Date() },
            { id: 2, text: 'Buy Pan', createdAt: null },
            { id: 3, text: 'Buy leche', createdAt: new Date() },
        ])
    }

}