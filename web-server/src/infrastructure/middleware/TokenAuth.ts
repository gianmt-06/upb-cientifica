import { Response } from "express";
import { Environment } from "../../environment/Environment";

export class TokenAuth {
  private env: Environment;
  
  constructor() {
    this.env = new Environment()
  }

  public generateToken(token: string, res: Response): void {
    try {      
      res.cookie("tkn", token, {
        httpOnly: true,
        secure: !(this.env.MODE === "developer"),
        // sameSite: "none"
      });
    } catch (error) {
      console.log(error);
    }
  }

  public deleteToken(res: Response): void {
    try {      
      res.cookie("tkn", "null", {
        maxAge: 1000, 
        httpOnly: true,
        secure: !(this.env.MODE === "developer"),
        // sameSite: "none"
      });
    } catch (error) {
      console.log(error);
    }
  }

}