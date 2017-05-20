const filterKeysBy = require(`./filterKeysBy.js`);

const getSchema = require(`./getSchema`);

const {uniq} = require(`lodash`);

module.exports = (Model, auth) => {

  const schema = getSchema(Model);

  const input = Object.keys(schema).map(
    k => schema[k]
  ).map(
    o => o.upload ? o.fileKey : o.key
  );

  const scope = schema.scope ? `scope` : filterKeysBy(Model, `scope`)[0];
  const login = schema.login ? `login` : filterKeysBy(Model, `login`);
  const password = schema.password ? `password` : filterKeysBy(Model, `password`)[0];
  const token = [scope, ...filterKeysBy(Model, `token`)];

  const obj = {
    input: uniq(input)
  };

  if (auth) return Object.assign({}, obj, {scope, login, password, token});
  return obj;

};
