// Purpose: Async handler for express routes.
const asyncHandler = (fn) => (req, res, next) => {
  // Make sure to `.catch()` any errors and pass them along to the `next()`
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
