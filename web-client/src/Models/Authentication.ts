import { Environment } from "../environment/Environment";

export interface UserData {
    username: string, 
    name: string, 
    lastname: string, 
    email: string, 
    password: string
}

export class Auth {
    private env: Environment;

    constructor(){
        this.env = new Environment()
    }

    public login = async (username: string, password: string): Promise<boolean> => {
        try {            
            const response = await fetch(`${this.env.API_URI}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                credentials: 'include'
            })
            
            const data = await response.json()

            return Promise.resolve(!data.error);
        } catch (error) {
            return Promise.resolve(false);
        }
    }

    public register = async (userdata: UserData): Promise<boolean> => {
        try {            
            const response = await fetch(`${this.env.API_URI}/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userdata),
                credentials: 'include'
            })
            
            const data = await response.json()

            return Promise.resolve(!data.error);
        } catch (error) {
            return Promise.resolve(false);
        }
    }

    public logout = async (): Promise<boolean> => {
        try {
            await fetch(`${this.env.API_URI}/auth/logout`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(false)
        }
    }

    public changeGroup = async (user: string): Promise<boolean> => {        
        try {
            await fetch(`${this.env.API_URI}/auth/group`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user
                }),
                credentials: 'include'
            })
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(false)
        }
    }

    public validate = async (): Promise<{ logged: boolean, username: string, role: string }> => {
        try {            
            const response = await fetch(`${this.env.API_URI}/auth/validate`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            
            const data = await response.json()
            
            return Promise.resolve({
                logged: !data.error,
                username: data.data.username,
                role: data.data.role
            });
        } catch (error) {
            return Promise.resolve({
                logged: false,
                username: "",
                role: ""
            });
        }
    }

    
}