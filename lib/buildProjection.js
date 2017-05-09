const getSchema = require(`./getSchema`);

module.exports = Model => {

  const schema = getSchema(Model);
  const extra = [];

  for (const k in schema) {

    const obj = schema[k];
    const project = obj.project;

    if (project === false) extra.push(`-${k}`);
    else if (project === true) extra.push(`${k}`);

  }

  const projection = [...extra, `-__v`];
  return projection;

};
