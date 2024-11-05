export default interface ResponseHandlerInterface {
    response(message: string, data?: any): Response;
    throwError(message: string): Response;
    serverError(): Response
}

interface Response {
    error: boolean,
    message: string,
    data?: any
}