export const errorHandler = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      statusCode: statusCode,
      success: err.success,
      data: err.data,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  };

  // in development mode, the error handler will return the stack trace of the error and the status code of the error
  // in production mode, the error handler will return a generic error message and the status code of the error