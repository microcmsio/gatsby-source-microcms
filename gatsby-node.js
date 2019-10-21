const { validateOptions } = require('./src/pluginOptions');
const { sourceNodes } = require('./src/sourceNodes');

exports.onPreBootstrap = validateOptions;
exports.sourceNodes = sourceNodes;
