const getSchema = require(`./getSchema`);
const Joi = require(`joi`);

module.exports = (
  Model,
  {
    ignoreRequired = false,
    allRequired = false,
    query = false
  } = {}
) => {

  const schema = getSchema(Model);

  const validation = {};

  for (const k in schema) {

    const obj = schema[k];
    const isRequired = obj.required;
    let val = obj.validation;

    let key = k;

    if (val) {

      if (obj.upload && !query) {

        val = Joi.any();
        key = obj.fileKey;

      }

      if (allRequired) validation[key] = val.required();
      else validation[key] = (isRequired === true && !ignoreRequired) ? val.required() : val;

    }

  }

  return validation;

};
