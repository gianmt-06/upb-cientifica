import { AuthServer } from "./AuthServer";
import { XMLLoginRequest } from "./templates/auth/XMLLogin";
import { RegisterInterface, XMLRegisterRequest } from "./templates/auth/XMLRegister";
import { XMLAddToGroup } from "./templates/groups/XMLAddToGroup";

export class CredentialsManager extends AuthServer {

    public login = async (username: string, password: string): Promise<{ code: number, token: string }> => {
        try {
            const request = XMLLoginRequest(username, password);

            const response = await this.doRequest(request);

            let code = String(response.data).match(/<status[^>]*>([^<]+)<\/status>/) || "404"
            let token = String(response.data).match(/<token[^>]*>([^<]+)<\/token>/) || ""

            if (token) token = token[1].toString();
            if (code) code = code[1].toString();

            return Promise.resolve({ code: parseInt(code), token: token })
        } catch (error) {
            return Promise.resolve({ code: 404, token: "" })
        }
    }

    public register = async (token: string, data: RegisterInterface) => {
        try {
            const request = XMLRegisterRequest(token, data);
            const response = await this.doRequest(request);

            const code = String(response.data).match(/<status[^>]*>([^<]+)<\/status>/) || "404"
            
            return Promise.resolve(parseInt(code[1].toString()));
        } catch (error) {
            return Promise.resolve(500)
        }
    }

    public addToGroup = async (token: string, group: string, username: string) => {
        try {
            const request = XMLAddToGroup(token, group, username);
            const response = await this.doRequest(request)

            const code = String(response.data).match(/<status[^>]*>([^<]+)<\/status>/) || "404"

            return Promise.resolve(parseInt(code[1].toString()));
        } catch (error) {
            return Promise.resolve(500)
        }
    }
}