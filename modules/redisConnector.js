const crypto = require('crypto');
const redis = require("ioredis");

module.exports = class RedisConnector {
    constructor(config) {
        this.client = new redis({
            port: config.redis.port, // Redis port
            host: config.redis.host, // Redis host
            password: config.redis.password
          });
    }

    // Function to set a key with an optional expiration time
    setKey(key, value, expireInSeconds = 0) {
        const hashedKey = crypto.createHash('md5').update(key).digest("hex");
        if (expireInSeconds > 0) {
            // Set the key with an expiration time
            this.client.set(hashedKey, value, "EX", expireInSeconds, (err, reply) => {
                if (err) {
                    console.log(`Error setting key "${hashedKey}" with expiration: ${err}`);
                    return;
                }
                console.log(`Key "${hashedKey}" set with expiration of ${expireInSeconds} seconds`);
            });
        } else {
            // Set the key without an expiration time
            this.client.set(hashedKey, value, (err, reply) => {
                if (err) {
                    console.log(`Error setting key "${hashedKey}": ${err}`);
                    return;
                }
                console.log(`Key "${hashedKey}" set successfully`);
            });
        }
    }

    // Function to get the value of a key
    getKey(key, callback) {
        const hashedKey = crypto.createHash('md5').update(key).digest("hex");
        this.client.get(hashedKey, (err, reply) => {
            if (err) {
                console.log(`Error getting key "${hashedKey}": ${err}`);
                callback(err, null);
                return;
            }
            console.log(`Value of key "${hashedKey}": ${reply}`);
            callback(null, reply);
        });
    }
};