"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDBC = void 0;
const redis_1 = require("redis");
const Environment_1 = require("../../environment/Environment");
class RedisDBC {
    static instance;
    redis;
    env = new Environment_1.Environment();
    constructor() {
        this.redis = (0, redis_1.createClient)({ url: this.env.REDIS_URI });
    }
    static getInstance() {
        if (RedisDBC.instance === null || RedisDBC.instance === undefined) {
            RedisDBC.instance = new RedisDBC();
        }
        return RedisDBC.instance;
    }
    connect = async () => {
        try {
            if (!this.redis.isReady) {
                await this.redis.connect();
            }
            return Promise.resolve(true);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            return Promise.resolve(false);
        }
    };
    close = async () => {
        try {
            await this.redis.quit();
            return Promise.resolve(true);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            return Promise.resolve(false);
        }
    };
    async isHealthy() {
        return await this.redis.ping() === 'PONG';
    }
    getClient = () => {
        return this.redis;
    };
}
exports.RedisDBC = RedisDBC;
//# sourceMappingURL=RedisConnection.js.map