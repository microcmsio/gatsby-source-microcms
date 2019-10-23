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
      endpoint: 'endpoint',
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('empty string options should be error.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      endpoint: 'point',
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
      endpoint: 'endpoint',
      type: 'type',
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('empty type option should be error.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      endpoint: 'endpoint',
      type: '',
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic.mock.calls.length).toBe(1);
  });

  test('format option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      endpoint: 'endpoint',
    };

    const formats = ['list', 'object'];

    for (let format of formats) {
      validateOptions({ reporter }, { ...options, format });
      expect(reporter.panic).not.toBeCalled();
    }
  });

  test('invalid format option should be error.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      endpoint: 'endpoint',
      format: 'array',
    };

    validateOptions({ reporter }, options);
    expect(reporter.panic.mock.calls.length).toBe(1);
  });

  test('fields option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      endpoint: 'endpoint',
      fields: ['id', 'title'],
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('invalide fields option should be error.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      endpoint: 'endpoint',
    };
    validateOptions({ reporter }, { ...options, fields: {} });
    expect(reporter.panic.mock.calls.length).toBe(1);

    validateOptions({ reporter }, { ...options, fields: ['id', 123] });
    expect(reporter.panic.mock.calls.length).toBe(2);
  });

  test('limit option should be success.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      endpoint: 'endpoint',
      limit: 1,
    };
    validateOptions({ reporter }, options);
    expect(reporter.panic).not.toBeCalled();
  });

  test('invalide limit option should be error.', () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      endpoint: 'endpoint',
    };

    // string
    validateOptions({ reporter }, { ...options, limit: 'abc' });
    expect(reporter.panic.mock.calls.length).toBe(1);
    // float
    validateOptions({ reporter }, { ...options, limit: 1.3 });
    expect(reporter.panic.mock.calls.length).toBe(2);
    // object
    validateOptions({ reporter }, { ...options, limit: {} });
    expect(reporter.panic.mock.calls.length).toBe(3);
    // array
    validateOptions({ reporter }, { ...options, limit: [2] });
    expect(reporter.panic.mock.calls.length).toBe(4);
  });
});
