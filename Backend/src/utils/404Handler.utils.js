export const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
};