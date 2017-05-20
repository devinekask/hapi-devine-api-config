const getSchema = require(`./getSchema`);

module.exports = Model => {

  const schema = getSchema(Model);

  const p = Object.keys(schema).map(
    k => {
      const {projection} = schema[k];
      if (projection === false) return `-${k}`;
      if (projection === true) return k;
      else return false;
    }
  ).filter(v => v !== false);

  return [...p, `-__v`];

};
