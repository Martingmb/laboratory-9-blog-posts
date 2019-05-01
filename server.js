const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./blog-post-router');
const { DATABASE_URL, PORT } = require('./config');
let jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use('/blog/api', jsonParser, router);


let server;

function runServer(port, databaseUrl) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl,
            err => {
                if (err) {
                    return reject(err);
                } else {
                    server = app.listen(port, () => {
                            console.log('Your app is running in port ', port);
                            resolve();
                        })
                        .on('error', err => {
                            mongoose.disconnect();
                            return reject(err);
                        });
                }
            }
        );
    });
}

function closeServer() {
    return mongoose.disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log('Closing the server');
                server.close(err => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
}

runServer(PORT, DATABASE_URL)
    .catch(err => console.log(err));

module.exports = { app, runServer, closeServer };