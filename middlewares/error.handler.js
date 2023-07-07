const { el } = require("@faker-js/faker");

function logErrors(error, req, res, next) {
    console.error('logError');
    console.error(error);
    next(error);
}

function errorHandler(error, req, res, next) {
    console.error('errorHandler');
    res.status(500).json({
        message: error.message,
        stack: error.stack,
    });
}

function boomErrorHandler(error, req, res, next) {
    if (error.isBoom) {
        const { output } = error;
        res.status(output.statusCode).json(output.payload);
    } else {
        next(error);
    }
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
