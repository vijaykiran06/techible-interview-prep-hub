const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message || "Server error" });
};

export { handleError };