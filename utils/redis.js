const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
	constructor() {
		this.client = redis.createClient();
		this.client.on("error", (error) => {
			console.error(`Redis client error: ${error}`);
		});

		this.promiseGet = promisify(this.client.get).bind(this.client);
		this.promiseDel = promisify(this.client.del).bind(this.client);
		this.promiseSet = promisify(this.client.set).bind(this.client);
	}


 	 isAlive() {
    		return this.client.connected;
  	}


	async get(key) {
		try {
			return await this.promiseGet(key);
		} catch (err) {
			console.error(`Error getting key ${key}: ${err}`);
			throw err;
		}
	}

	async set(key, value, duration) {
		try {
			// Redis expects 'EX' and the expiration time as separate arguments.
			return await this.promiseSet(key, JSON.stringify(value), 'EX', duration);
		} catch (err) {
			console.error(`Error setting key ${key}: ${err}`);
			throw err;
		}
	}


	async del(key) {
		try {
			await this.promiseDel(key);
		} catch (error) {
			console.error('Error in del method', error.message);
			throw error;
		}
	}
}

const redisClient = new RedisClient();
export default redisClient;
