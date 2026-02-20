const adminAuth = (req, res, next) => {
  const token = "abcd";
  const isAdminAuthorized = token === "abcd";

  if (!isAdminAuthorized) {
    res.status(401).send("Admin not authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
