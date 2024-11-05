import ResponseHandlerInterface from "../../../contracts/responseHandler/ReponseHandlerInterface";
import ResponseHandler from "../../responseHandler/ResponseHandler";

export default class Controller {
    protected readonly responseHandler: ResponseHandlerInterface;
    
    constructor(){
        this.responseHandler = new ResponseHandler();
    }
}