//import { createClient } from "redis"; --ES6 way of calling redis but using commonjs

const redis = require('redis');

/**const utilities = require('util');
const promisify = utilities.promisify(); -Tried to use this in the same manner as declaring redis client
*/					- But utilities.promisify() is not a function that returns a promisify function. Instead, utilities.promisify is a function that takes a function as an argument and returns a promisified version of that function.


/* const { promisify } = require('util') // -this works looks like es6 + commonjs


class RedisClient {
  constructor() {
    //this.client = createClient();
    this.client = redis.createClient();
    this.client.on("error", (error) => {
      console.error(`Redis client error: ${error}`);
    });

    // Connect to Redis
    //this.client.connect().catch(console.error);
    //await this.client.connect(); - used in later versions of redis but currently connects automatically


  //Creating promiseversions of the different redis functions
/*  this.promiseGet = promisify(this.client.get).bind(this.client);
  this.promiseDel = promisify(this.client.del).bind(this.client);
  this.promiseSet = promisify(this.client.del.toString()).bind(this.client);
}

  isAlive() {
    return this.client.connected && this.client.ready;
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
      	return await this.promiseSet(key, JSON.stringify(value), {
      	EX: duration,
    });
  } catch(err) {
	console.eror(`Error setting key ${key}: ${err}`)
	throw err;
	}
  }

  async del(key) {
   try { await this.promiseDel(key);
  } catch (error) {
	console.error('Error in del method', error.message);
	throw error;
	}
  }
}


const redisClient = new RedisClient();
export default redisClient;
*/

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
    return this.client.connected && this.client.ready;
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
      return await this.promiseSet(key, JSON.stringify(value), {
        EX: duration,
      });
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
