const crypto = require('crypto');

const redis = require("ioredis");

module.exports = class RedisConnector {
    constructor(config) {
        console.log('config', config);
        this.client = new redis({
            port: config.redis.port, // Redis port
            host: config.redis.host, // Redis host
            password: config.redis.password
          });
    }

    // Function to set a key with an optional expiration time
    setKey(key, value, expireInSeconds = 0) {
        if (expireInSeconds > 0) {
            // Set the key with an expiration time
            this.client.set(key, value, "EX", expireInSeconds, (err, reply) => {
                if (err) {
                    console.log(`Error setting key "${key}" with expiration: ${err}`);
                    return;
                }
                console.log(`Key "${key}" set with expiration of ${expireInSeconds} seconds`);
            });
        } else {
            // Set the key without an expiration time
            this.client.set(key, value, (err, reply) => {
                if (err) {
                    console.log(`Error setting key "${key}": ${err}`);
                    return;
                }
                console.log(`Key "${key}" set successfully`);
            });
        }
    }

    // Function to get the value of a key
    getKey(key, callback) {
        this.client.get(key, (err, reply) => {
            if (err) {
                console.log(`Error getting key "${key}": ${err}`);
                callback(err, null);
                return;
            }
            console.log(`Value of key "${key}": ${reply}`);
            callback(null, reply);
        });
    }
};