const Joi = require('@hapi/joi');

const defaultOptions = {
  version: 'v1',
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
  apis: Joi.array()
    .items(
      Joi.object({
        endpoint: Joi.string()
          .required()
          .empty(),
        type: Joi.string(),
        format: Joi.string().pattern(/^(list|object)$/),
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
      })
    )
    .required()
    .empty(),
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
