const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * dataToUpdate --> takes an object that has the data values that will be updated in the DB
 * jsToSql --> takes an object that has the DB column names corresponds with the keys  from dataToUpdate
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {

  // get the keys from dataToUpdate obj
  const keys = Object.keys(dataToUpdate);

  // if no keys throw error
  if (keys.length === 0) throw new BadRequestError("No data");

  // creates array where each key from the obj is set equal to the idx of the sql command.
  // ex: 
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    // returns
    // setCols: the value of cols joined together
    // values: is an array of the values that correspond to each DB param
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
