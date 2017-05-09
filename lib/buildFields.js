const getSchema = require(`./getSchema`);

module.exports = Model => {
  const schema = getSchema(Model);
  return Object.keys(schema);
};
