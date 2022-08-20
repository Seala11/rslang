const createError = (err: Error, errName: string) => {
  const error = err;
  error.name = errName;
  return error;
};
export default createError;
