import { Request, Response } from "express";
import Controller from "../../infrastructure/express/controller/Controller"

export default class TestController extends Controller {
    constructor(){
        super();
    }

    public printHealth = (_req: Request, res: Response): void => {
        try {
            res.status(201).json({message: "Online"});
        } catch (error) {
            res.status(500).json(this.responseHandler.serverError())
        }
    }
}
