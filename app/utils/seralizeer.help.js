/**
 *
 * @param {obj} obj Object
 * @return {int} count
 */
function countProperties(obj) {
  let count = 0;

  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      count++;
    }
  }

  return count;
}

/**
 *
 * @param {object} obj object with no keys
 * @return {boolean} true when empty
 */
function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

module.exports = {countProperties, isEmpty};
