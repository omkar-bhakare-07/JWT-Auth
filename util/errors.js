export class AppError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true; // marks this as an expected, handled error
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404, 'NOT_FOUND');
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Invalid request data') {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

export class DuplicateResourceError extends AppError {
    constructor(message = 'Resource already exists') {
        super(message, 409, 'DUPLICATE_RESOURCE');
    }
}

export class InsufficientStockError extends AppError {
    constructor(medicineId) {
        super(`Insufficient stock for medicine ID ${medicineId}`, 409, 'INSUFFICIENT_STOCK');
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Authentication required') {
        super(message, 401, 'UNAUTHORIZED');
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'You do not have permission to perform this action') {
        super(message, 403, 'FORBIDDEN');
    }
}