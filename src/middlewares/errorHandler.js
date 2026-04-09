export default (error, req, res, next) => {
  console.error(error);

  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Something went wrong",
  });
};
