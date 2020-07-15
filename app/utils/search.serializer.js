const ACCEPTED_SORT_WORDS = ['asc', 'desc', 'ascending', 'descending', '1', '-1'];

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
function searchParams(name='', cbNum=0, genr='', lte=false) {
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


module.exports = {escapeRegex, searchParams, isSortInValid};
