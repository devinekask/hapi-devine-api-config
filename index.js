module.exports = (Model, {
  apiBase = `/api`,
  auth = false
} = {}) => {

  const fields = require(`./lib/buildFields.js`)(Model, auth);
  const validation = require(`./lib/buildValidation.js`)(Model, auth);

  const projection = require(`./lib/buildProjection.js`)(Model);
  const uploads = require(`./lib/buildUploads.js`)(Model);

  const collectionName = Model.collection.name;
  const modelName = Model.modelName.toLowerCase();

  const route = `${apiBase}/${collectionName}`; // api/users

  return {
    fields,
    validation,
    uploads,
    projection,
    collectionName,
    modelName,
    Model,
    route
  };

};
