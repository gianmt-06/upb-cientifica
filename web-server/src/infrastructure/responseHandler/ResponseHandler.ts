import ResponseHandlerInterface from "../../contracts/responseHandler/ReponseHandlerInterface";

export default class ResponseHandler implements ResponseHandlerInterface {
    public response(message: string, data?: any) {
        return {
            error: false,
            message,
            data
        }
    }

    public throwError(message: string) {
        return {
            error: true,
            message
        }
    }

    public serverError(){
        return this.throwError("Error de servidor");
    }
}