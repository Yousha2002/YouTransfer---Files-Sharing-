const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      message: "Duplicate entry",
      field: err.errors[0]?.path,
      error: "This value already exists",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "File too large",
      maxSize: "100MB",
    });
  }

  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({
      message: "Too many files",
      maxFiles: "10",
    });
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      message: "Unexpected field",
    });
  }

  if (err.message.includes("Cloudinary")) {
    return res.status(500).json({
      message: "File storage error",
    });
  }

  res.status(500).json({
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
};

module.exports = errorHandler;
