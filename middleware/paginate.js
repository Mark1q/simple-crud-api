const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../utils/pagination');

function paginate(options = {}) {
  const defaultPage = options.defaultPage || DEFAULT_PAGE;
  const defaultLimit = options.defaultLimit || DEFAULT_LIMIT;
  const maxLimit = options.maxLimit || MAX_LIMIT;


  return (req, res, next) => {
    const page = Math.max(parseInt(req.query.page) || defaultPage, 1);
    const limit = Math.min(parseInt(req.query.limit) || defaultLimit, maxLimit);
    const skip = (page - 1) * limit;

    req.pagination = { page, limit, skip };
    next();
  };
}

module.exports = { paginate };