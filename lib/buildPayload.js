const getSchema = require(`./getSchema`);

module.exports = (
  Model,
  {
    ignoreRequired = false,
    allRequired = false,
  } = {}
) => {

  const schema = getSchema(Model);

  const validation = {};

  for (const k in schema) {

    const obj = schema[k];
    const isRequired = obj.required;
    const val = obj.validation;

    if (val !== false) {

      if (allRequired) validation[k] = val.required();
      else validation[k] = (isRequired === true && !ignoreRequired) ? val.required() : val;

    }

  }

  console.log(validation);

  return validation;

};
