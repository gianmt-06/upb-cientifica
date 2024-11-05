import { createClient, RedisClientType } from "redis"
import { Environment } from "../../environment/Environment"

export class RedisDBC {
    private static instance: RedisDBC
    private readonly redis: RedisClientType
    private readonly env = new Environment();

    private constructor() {
        this.redis = createClient({ url: this.env.REDIS_URI })
    }

    public static getInstance(): RedisDBC {
        if (RedisDBC.instance === null || RedisDBC.instance === undefined) {
            RedisDBC.instance = new RedisDBC()
        }
        return RedisDBC.instance
    }

    public connect = async (): Promise<boolean> => {
        try {
            if (!this.redis.isReady) {
                await this.redis.connect()
            }
            return Promise.resolve(true)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
            return Promise.resolve(false)
        }
    }

    public close = async (): Promise<boolean> => {
        try {
            await this.redis.quit()
            return Promise.resolve(true)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
            return Promise.resolve(false)
        }
    }

    public async isHealthy(): Promise<boolean> {
        return await this.redis.ping() === 'PONG'
    }

    public getClient = (): RedisClientType => {
        return this.redis
    }
}