export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error("Forbidden: You do not have permission");
      error.status = 403;
      return next(error);
    }
    next();
  };
};
