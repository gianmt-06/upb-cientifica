export class Environment {
    API_URI: string
    STREAMING_URI: string

    constructor() {
        // this.API_URI = 'http://conquest3.bucaramanga.upb.edu.co:5000'
        this.API_URI = 'http://localhost:1802'
        this.STREAMING_URI = 'http://localhost:1803'
    }
}