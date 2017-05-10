module.exports = (Model, {
  apiBase = `/api`
} = {}) => {

  const fields = require(`./lib/buildFields.js`)(Model);
  const validation = require(`./lib/buildValidation.js`)(Model);
  const projection = require(`./lib/buildProjection.js`)(Model);

  const collectionName = Model.collection.name;
  const modelName = Model.modelName.toLowerCase();

  const route = `${apiBase}/${collectionName}`; // api/users

  return {
    fields,
    validation,
    projection,
    collectionName,
    modelName,
    route
  };

};
