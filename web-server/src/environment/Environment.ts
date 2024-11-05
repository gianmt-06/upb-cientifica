export class Environment {
    SERVER_HOST: string;
    SERVER_PORT: number;
    ROOT_DIR: string;
    WEBCLIENT_URI: string;
    GRPC_URI: string
    LDAP_URI: string;
    MPI_URI: string;
    REDIS_URI: string;
    STREAMING_URI: string;
    MODE: string;
    
    constructor() {
        this.SERVER_HOST = process.env['SERVER_HOST'] ?? 'localhost',
        this.SERVER_PORT = parseInt(process.env['SERVER_PORT'] ?? '1800')

        this.GRPC_URI = process.env['GRPC_URI'] ?? '127.0.0.1:50051';
        this.MPI_URI = process.env['MPI_URI'] ?? '127.0.0.1:50051';
        this.ROOT_DIR = process.env['ROOT_DIR'] ?? 'not root dir';
        this.LDAP_URI = process.env['LDAP_URI'] ?? 'http://ldap-notfound.com';
        this.REDIS_URI = process.env['REDIS_URI'] ?? 'redis://localhost:6379';
        this.STREAMING_URI = process.env['STREAMING_URI'] ?? 'redis://localhost:1803';
        this.WEBCLIENT_URI = process.env['WEBCLIENT_URI'] ?? 'http://localhost:5000'
        this.MODE = process.env['MODE'] ?? 'developer'   
    }
}