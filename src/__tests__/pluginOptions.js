const { createPluginConfig, validateOptions } = require('../pluginOptions');

const reporter = {
  panic: jest.fn(),
};

beforeEach(() => {
  reporter.panic.mockClear();
});

describe('createPluginConfig', () => {
  const options = {
    apiKey: 'key',
  };

  test('createPluginConfig.get', () => {
    const pluginConfig = createPluginConfig(options);
    expect(pluginConfig.get('apiKey')).toBe(options['apiKey']);
    expect(pluginConfig.get('dummy')).not.toBeDefined();
  });

  test('createPluginConfig.getOriginalPluginOptions', () => {
    const pluginConfig = createPluginConfig(options);
    expect(pluginConfig.getOriginalPluginOptions()).toBe(options);
  });
});

describe('validateOptions', () => {
  test('empty option should be error.', () => {
    const options = {};
    validateOptions({ reporter }, options);
    expect(reporter.panic.mock.calls.length).toBe(1);
  });

  test('required option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint'
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('empty string options should be error.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint'
      }],
    };

    Object.keys(options).forEach((key, index) => {
      const opt = { ...options, [key]: '' };
      validateOptions({ reporter }, opt);
      expect(reporter.panic.mock.calls.length).toBe(index + 1);
    });
  });

  test('type option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        type: 'type',
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('empty type option should be error.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        type: '',
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic.mock.calls.length).toBe(1);
  });

  test('format option should be success.', () => {
    const options = [{
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        format: 'list'
      }],
    },
    {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        format: 'object'
      }],
    }];

    for (let option of options) {
      validateOptions({ reporter }, option);
      expect(reporter.panic).not.toBeCalled();
    }
  });

  test('invalid format option should be error.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        format: 'array'
      }],
    };

    validateOptions({ reporter }, options);
    expect(reporter.panic.mock.calls.length).toBe(1);
  });

  test('draftKey option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          draftKey: 'DRAFT_KEY',
        },
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('invalid draftKey option should be error.', () => {
    const options = (draftKey) => ({
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          draftKey,
        },
      }],
    });

    // empty string
    validateOptions({ reporter }, options(''));
    expect(reporter.panic.mock.calls.length).toBe(1);
    // float
    validateOptions({ reporter }, options(1.3));
    expect(reporter.panic.mock.calls.length).toBe(2);
    // object
    validateOptions({ reporter }, options({}));
    expect(reporter.panic.mock.calls.length).toBe(3);
    // array
    validateOptions({ reporter }, options([2]));
    expect(reporter.panic.mock.calls.length).toBe(4);
  });

  test('fields option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          fields: ['id', 'title'].join(','),
        },
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('invalide fields option should be error.', () => {
    const options = (fields) => ({
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          fields,
        },
      }],
    });
    validateOptions({ reporter }, options({}));
    expect(reporter.panic.mock.calls.length).toBe(1);

    validateOptions(
      { reporter },
      options(['id', 123])
    );
    expect(reporter.panic.mock.calls.length).toBe(2);
  });

  test('limit option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          limit: 1,
        },
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('invalide limit option should be error.', () => {
    const options = (limit) => ({
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          limit,
        },
      }],
    });

    // string
    validateOptions({ reporter }, options('abc'));
    expect(reporter.panic.mock.calls.length).toBe(1);
    // float
    validateOptions({ reporter }, options(1.3));
    expect(reporter.panic.mock.calls.length).toBe(2);
    // object
    validateOptions({ reporter }, options({}));
    expect(reporter.panic.mock.calls.length).toBe(3);
    // array
    validateOptions({ reporter }, options([2]));
    expect(reporter.panic.mock.calls.length).toBe(4);
  });

  test('offset option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          offset: 1,
        },
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('invalide offset option should be error.', () => {
    const options = (offset) => ({
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          offset,
        },
      }],
    });

    // string
    validateOptions({ reporter }, options('abc'));
    expect(reporter.panic.mock.calls.length).toBe(1);
    // float
    validateOptions({ reporter }, options(1.3));
    expect(reporter.panic.mock.calls.length).toBe(2);
    // object
    validateOptions({ reporter }, options({}));
    expect(reporter.panic.mock.calls.length).toBe(3);
    // array
    validateOptions({ reporter }, options([2]));
    expect(reporter.panic.mock.calls.length).toBe(4);
  });

  test('filters option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          filters: 'tag[exists]',
        },
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('invalid filters option should be success.', () => {
    const options = (filters) => ({
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          filters,
        },
      }],
    });

    // empty string
    validateOptions({ reporter }, options(''));
    expect(reporter.panic.mock.calls.length).toBe(1);
    // number
    validateOptions({ reporter }, options(100));
    expect(reporter.panic.mock.calls.length).toBe(2);
    // object
    validateOptions({ reporter }, options({}));
    expect(reporter.panic.mock.calls.length).toBe(3);
    // array
    validateOptions({ reporter }, options(['a', 2]));
    expect(reporter.panic.mock.calls.length).toBe(4);
  });

  test('depth option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          depth: 3,
        },
      }],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('invalid depth option should be error.', () => {
    const options = (depth) => ({
      apiKey: 'key',
      serviceId: 'id',
      apis: [{
        endpoint: 'endpoint',
        query: {
          depth,
        },
      }],
    });

    // string
    validateOptions({ reporter }, options('abc'));
    expect(reporter.panic.mock.calls.length).toBe(1);
    // float
    validateOptions({ reporter }, options(1.3));
    expect(reporter.panic.mock.calls.length).toBe(2);
    // over max int
    validateOptions({ reporter }, options(4));
    expect(reporter.panic.mock.calls.length).toBe(3);
    // array
    validateOptions({ reporter }, options(['11', 22]));
    expect(reporter.panic.mock.calls.length).toBe(4);
  });
});
