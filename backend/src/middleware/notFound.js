const notFound = (req, res, next) => {
  const error = new Error(
    "Page/Resource you are looking for does not exist!"
  );
  error.status = 404;
  next(error);
};

export default notFound;
