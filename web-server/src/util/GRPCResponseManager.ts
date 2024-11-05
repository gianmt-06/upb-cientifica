export interface GRPCResponse<T> {
    success: boolean
    message: string
    code?: number
    data?: T
}

export const translateCode = (code: number | undefined ) => {    
    if (code == undefined) return 400;

    switch (code) {
        case 0:
            return 200; 
        case 5:
            return 404; 
        default:
            return 400
    }
}