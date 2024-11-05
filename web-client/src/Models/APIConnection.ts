import { ApiResponse } from "./responseHandler/ResponseHandler";

export class APIConnection {

    public async doRequest<T>(method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH', endpoint: string, resource: string, data?: any): Promise<T> {
        const response = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'resource-hash': resource
            },
            body: data ? JSON.stringify(data) : undefined,
            credentials: 'include' 
        });
    
        const result: T = await response.json();

        if (!response.ok) {
            const badResponse = result as ApiResponse<void>; 
            throw new Error(`${badResponse.message}`);
        }
    
        return result;
    };

    public async blobRequest<T>(endpoint: string, data: FormData, parentHash: string): Promise<T> {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'resource-hash': parentHash
            },
            body: data,
            credentials: 'include'
        });
    
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
    
        const result: T = await response.json();
        return result;
    };
    
}