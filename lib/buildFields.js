const getSchema = require(`./getSchema`);

const {uniq} = require(`lodash`);

module.exports = Model => {

  const arr = [];

  const schema = getSchema(Model);

  Object.keys(schema).forEach(k => {
    const key = schema[k].upload ? schema[k].fileKey : k;
    arr.push(key);
  });

  return uniq(arr);

};
