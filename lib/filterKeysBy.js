const getSchema = require(`./getSchema`);

module.exports = (Model, filter) => {

  const schema = getSchema(Model);

  return Object.keys(schema)
    .map(k => schema[k])
    .filter(o => o[filter])
    .map(o => o.key);

};
