// Basic centralized error handler
// In production you can expand this for validation and custom errors
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
};


