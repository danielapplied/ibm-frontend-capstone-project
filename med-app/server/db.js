const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    
    // Check if URI is defined
    if (!mongoURI) {
        throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    try {
        await mongoose.connect(mongoURI, { 
            dbName: 'stayhealthybeta1'
        });
        console.info('Connected to Mongo Successfully');
        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`);
        return await connectToMongo(nextRetryCount);
    }
};

module.exports = connectToMongo;
