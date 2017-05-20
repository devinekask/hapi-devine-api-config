const buildPayload = require(`./buildPayload`);

const Joi = require(`joi`);
Joi.objectId = require(`joi-objectid`)(Joi);

module.exports = (Model, auth = false) => {

  const base = {
    options: {
      abortEarly: false
    }
  };

  const params = {
    params: {
      _id: Joi.objectId().required()
    }
  };

  const postPayload = {
    payload: buildPayload(Model)
  };

  const patchPayload = {
    payload: buildPayload(Model, {ignoreRequired: true})
  };

  const putPayload = {
    payload: buildPayload(Model, {allRequired: true})
  };

  const deleteQuery = {
    query: {
      hard: Joi.boolean().default(false)
    }
  };

  const getQuery = {
    query: Object.assign(
      {},
      buildPayload(Model, {ignoreRequired: true, query: true}),
      {
        sort: Joi.string().default(`created`),
        fields: Joi.string(),
        perPage: Joi.number().default(20),
        page: Joi.number().default(1),
        q: Joi.string().min(1)
      }
    )
  };

  const authPayload = {
    login: Joi.string().required(),
    password: Joi.string().required(),
    audience: Joi.string().required(),
    expiresIn: Joi.string(),
    notBefore: Joi.string()
  };


  const obj = {

    POST: Object.assign({}, base, postPayload),

    GET: Object.assign({}, base, getQuery),
    GET_ONE: Object.assign({}, base, params),

    PATCH: Object.assign({}, base, params, patchPayload),
    PUT: Object.assign({}, base, params, putPayload),

    DELETE: Object.assign({}, base, params, deleteQuery)

  };

  if (auth) obj.AUTH = Object.assign({}, base, authPayload);

  return obj;

};
