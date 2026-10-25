export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';
    let errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';

    if (err.code === 11000) {
        statusCode = 409;
        message = 'Email or phone number already exists';
        errorCode = 'DUPLICATE_RESOURCE';
    } else if (err.name === 'ValidationError' && err.errors) {
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(', ');
        errorCode = 'VALIDATION_ERROR';
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
        errorCode = 'VALIDATION_ERROR';
    }

    const knownDatabaseError =
        err.code === 11000 ||
        (err.name === 'ValidationError' && err.errors) ||
        err.name === 'CastError';

    if (statusCode >= 500 || (!err.isOperational && !knownDatabaseError)) {
        statusCode = 500;
        message = 'Internal server error';
        errorCode = 'INTERNAL_SERVER_ERROR';
        console.error(err);
    }

    return res.status(statusCode).json({
        success: false,
        error: { code: errorCode, message },
        timestamp: new Date().toISOString()
    });
};
