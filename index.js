const config = require('./lib/config');
const redisConnector = require('./modules/redisConnector');

const Redis = new redisConnector(config);

// Set a key with an expiration of 120 seconds
Redis.setKey('testKey', 'testValue', 120);

// Get the value of a key
Redis.getKey('testKey', (err, value) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Retrieved value: ${value}`);
});