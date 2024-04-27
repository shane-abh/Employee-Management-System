require('dotenv').config();
const express = require('express');
const {
    connectToDb
} = require('./db.js');
const {
    installHandler
} = require('./apiHandler.js');

const app = express();

const port = process.env.API_SERVER_PORT || 3000;

// function for starting the server
(async function start() {
    try {
        await connectToDb();
        await installHandler(app);
        app.listen(port, function () {
            console.log(`App started on port ${port} \nLink: http://localhost:${port}/ \nGraphQL: http://localhost:${port}/graphql`);
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();

app.get('/', (req, res) => {
    res.send('API SERVER OF EMS');
});