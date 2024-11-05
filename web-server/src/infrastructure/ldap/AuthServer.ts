import axios from "axios";
import { Environment } from "../../environment/Environment";


export abstract class AuthServer {
    private env: Environment;
    private ldapUri: string;

    constructor() {
        this.env = new Environment();
        this.ldapUri = this.env.LDAP_URI;
    }

    public doRequest = async (XMLrequest: string, endpoint?: string,): Promise<{status: number, data:any}> => {
        try {            
            const response = await axios.post(
                `${this.ldapUri}${endpoint || ""}`, XMLrequest, {
                headers: {
                    'Content-Type': 'text/xml;charset=UTF-8',
                },
            })
                        
            return {status: response.status, data: response.data};
        } catch (error) {
            console.log(error);
            return {status: 500, data: ""}
        }
    }
}