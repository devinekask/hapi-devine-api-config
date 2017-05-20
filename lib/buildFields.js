const filterKeysBy = require(`./filterKeysBy.js`);

const getSchema = require(`./getSchema`);

const {uniq} = require(`lodash`);

module.exports = Model => {

  const schema = getSchema(Model);

  const input = Object.keys(schema).map(
    k => schema[k]
  ).map(
    o => o.upload ? o.fileKey : o.key
  );

  const scope = schema.scope ? `scope` : filterKeysBy(Model, `scope`)[0];

  return {
    login: schema.login ? `login` : filterKeysBy(Model, `login`),
    password: schema.password ? `password` : filterKeysBy(Model, `password`)[0],
    scope,
    token: [scope, ...filterKeysBy(Model, `token`)],
    input: uniq(input)
  };

};
