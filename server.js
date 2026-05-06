require("dotenv").config();
const app = require('./app');
const sequelize = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// Start the server after successful DB connection
const startServer = async () => {
    try {
        console.log("try try try")
        await sequelize.authenticate();
        console.log('Connection to the database went well !');

        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Starting Error: ', error);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Server shutdown in progress...');
    try {
        await sequelize.close();
        console.log('DB connection closed succesfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error when shutdown: ', error);
        process.exit(1);
    }
});

startServer();