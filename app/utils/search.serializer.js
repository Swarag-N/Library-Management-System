const ACCEPTED_SORT_WORDS = ['asc', 'desc', 'ascending', 'descending', '1', '-1'];

const TO_BE_NUMBERS = ['page', 'cbNum'];
const TO_BE_STRING = ['name', 'genr', 'cbNum', 'sort'];
const TO_BE_BOOLEAN = ['lte'];

/**
 * @param {string} text
 * @return {string} regex modified string
 */
function escapeRegex(text) {
  const reg = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  return new RegExp(reg, 'gi');
}

/**
 *
 * @param {string} name
 * @param {number} cbNum
 * @param {string} genr
 * @param {boolean} lte
 *
 * @return {object}
 */
function searchParams(name, cbNum, genr, lte) {
  return ({
    name: escapeRegex(name),
    cupBoardNumber: lte?{$lte: cbNum}:{$gte: cbNum},
    genre: escapeRegex(genr),
  });
}

/**
 *
 * @param {string} sort
 * @return {boolean} True if sort value is Valid
 */
function isSortInValid(sort) {
  if (!ACCEPTED_SORT_WORDS.includes(sort)) {
    return (true);
  } else {
    return false;
  }
}


/**
 * @param {object} request
 * @param {object} response
 * @param {object} next
 */
function sanitizeQueryParams(request, response, next) {
  let invalidParam = false;
  let message = '';
  const {query} = request;
  for (const key of Object.keys(query)) {
    if (TO_BE_NUMBERS.includes(key)) {
      if (Number(query[key])) {
        request.query[key] = Number(request.query[key]);
      } else {
        invalidParam=true;
        message=`${key} is expected to be Number`;
        break;
      }
    } else if (TO_BE_STRING.includes(key)) {
      if (String(query[key])) {
        request.query[key] = String(request.query[key]);
      } else {
        invalidParam=true;
        message=`${key} is expected to be String`;
        break;
      }
    } else if (TO_BE_BOOLEAN.includes(key)) {
      if (query[key]) {
        request.query[key] = Boolean(request.query[key]);
      } else {
        invalidParam=true;
        message=`${key} is Empty`;
        break;
      }
    } else {
      invalidParam = true;
      message = 'Invalid Param is Passed';
      break;
    }
  }
  if (invalidParam) {
    response.status(400).json({message});
  } else {
    next();
  }
}

module.exports = {escapeRegex, searchParams, isSortInValid, sanitizeQueryParams};
