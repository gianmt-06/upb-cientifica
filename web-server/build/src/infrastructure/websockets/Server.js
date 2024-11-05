"use strict";
// import { WebSocketServer } from "ws";
// import Environment from "../express/config/Environment";
Object.defineProperty(exports, "__esModule", { value: true });
// export class Server {
//     private readonly socketServer: WebSocketServer;
//     private readonly env: Environment;
//     constructor(
//     ) {
//         this.env = new Environment();
//         this.socketServer = new WebSocketServer({port: 2000})
//     }
//     getSocketServer = () => {
//         return this.socketServer
//     }
//     start = () => {
//         console.log("WebSocket run on port " + this.env.PORT + "...");
//         this.socketServer.on('connection', (websocket) => {
//             console.log("New client connected");
//             websocket.send("Socket server online");
//             websocket.on('message', (_message) => {        
//                 console.log("not implemented");
//             })
//             websocket.on('close', () => {
//                 console.log("Connection closed... Bye");
//             })
//         })
//     }
// }
//# sourceMappingURL=Server.js.map