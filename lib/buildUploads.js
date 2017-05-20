const getSchema = require(`./getSchema`);

const {omit} = require(`lodash`);

module.exports = Model => {

  const schema = getSchema(Model);

  const uploads = [];

  Object.keys(schema).forEach(k => {

    const obj = schema[k];

    const {fileKey, upload, rName} = obj;

    if (upload) {

      let exists = uploads.find(o => o.fileKey === fileKey);

      if (!exists) {

        exists = {
          fileKey,
          uploads: [],
          rName,
        };

        uploads.push(exists);

      }

      exists.uploads.push(omit(obj, [`validation`, `required`, `type`, `upload`, `fileKey`, `rName`]));

    }

  });

  return uploads;

};
