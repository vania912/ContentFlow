// ============================================================================
// ERROR HANDLER MIDDLEWARE
// ============================================================================

function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);

    // Default error response
    const status = err.status || 500;
    const message = err.message || 'Internal server error';

    res.status(status).json({
        error: message,
        status: status,
    });
}

// ============================================================================
// EXPORT
// ============================================================================

module.exports = errorHandler;