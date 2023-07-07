const express = require("express");
const cors = require('cors');
const routerApi = require('./routes');
const { auth } = require('express-openid-connect');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'SH2DbEzvk82P6uSSJGnKuJMcRcEMUXS4',
    issuerBaseURL: 'https://dev-ruyzcskj60l2e4ap.us.auth0.com'
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
/*const whitelist = ['http://localhost:8080', 'https://MyAppFer.com']
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Acceso no permitido"));
        }
    }
}*/
app.use(cors());

app.get("api/", (req, res) => {
    res.send("Hola este es mi servidor Express.");
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(auth(config));

app.listen(port, () => {
    console.log("Mi puerto:" + port);
});
