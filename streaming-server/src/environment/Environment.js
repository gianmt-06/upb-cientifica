export class Environment {
    constructor(){
        this.SERVER_HOST = process.env['SERVER_HOST'] ?? 'localhost',
        this.SERVER_PORT = parseInt(process.env['SERVER_PORT'] ?? '1800')

        this.CDNS = process.env['CDN_IPS'] ?? '127.0.0.0',
        this.STREAMING_DIR = process.env['STREAMING_DIR'] ?? '/home/noname',
        this.SOURCE_DIR = process.env['SOURCE_DIR'] ?? '/home/noname'
        this.HASH_KEY = process.env['HASH_KEY'] ?? 'SECRET_KEY'
    }
}