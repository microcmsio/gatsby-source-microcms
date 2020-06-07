const Joi = require('@hapi/joi');

const defaultOptions = {
  format: 'list',
  version: 'v1',
  readAll: false,
  fields: [],
  query: {},
};

const createPluginConfig = pluginOptions => {
  const config = { ...defaultOptions, ...pluginOptions };

  return {
    get: key => config[key],
    getOriginalPluginOptions: () => pluginOptions,
  };
};

const optionsSchema = Joi.object().keys({
  apiKey: Joi.string()
    .required()
    .empty(),
  serviceId: Joi.string()
    .required()
    .empty(),
  endpoint: Joi.string()
    .required()
    .empty(),
  type: Joi.string(),
  format: Joi.string().pattern(/^(list|object)$/),
  readAll: Joi.boolean(),
  query: Joi.object({
    draftKey: Joi.string(),
    fields: Joi.string(),
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
    filters: Joi.string(),
    depth: Joi.number()
      .integer()
      .max(3),
  }),
  version: Joi.string(),
  plugins: Joi.array(),
});

const validateOptions = ({ reporter }, options) => {
  const result = optionsSchema.validate(options, { abortEarly: false });

  if (result.error) {
    const errors = result.error.details.map(detail => {
      return detail.message;
    });

    reporter.panic(
      `Problems with gatsby-source-microcms plugin options:\n${errors.join(
        '\n'
      )}`
    );
  }
};

module.exports = {
  validateOptions,
  createPluginConfig,
};
