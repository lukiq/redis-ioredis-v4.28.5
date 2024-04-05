const config = require('./lib/config');
const redisConnector = require('./modules/redisConnector');

const Redis = new redisConnector(config);

// Set a key with an expiration of 10 seconds
Redis.setKey('testKey', 'testValue', 10);

// Get the value of a key
Redis.getKey('testKe2', (err, value) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Retrieved value: ${value}`);
});