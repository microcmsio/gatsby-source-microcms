# gatsby-source-microcms

[![npm version](https://img.shields.io/npm/v/gatsby-source-microcms.svg)](https://www.npmjs.com/package/gatsby-source-microcms)
[![install size](https://packagephobia.now.sh/badge?p=gatsby-source-microcms)](https://packagephobia.now.sh/result?p=gatsby-source-microcms)

Source plugin for Gatsby from [microCMS](https://microcms.io/).

## Install

```sh
# npm
$ npm install gatsby-source-microcms

# or yarn
$ yarn add gatsby-source-microcms
```

## How to use

### gatsby-config.js

First, to fetch contents from microCMS, you need setting options in `gatsby-config.js`.

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: 'MICROCMS_API_KEY',
        serviceId: 'myblog',
        apis: [
          {
            endpoint: 'posts',
          },
        ],
      },
    },
  ],
};
```

### gatsby-node.js

You can query like the following. Gatsby create Pages based on microCMS contents.

```js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMicrocmsPost(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              createdAt
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMicrocmsPost.edges.forEach((post, index) => {
    createPage({
      path: post.node.id,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: post.node.id,
      },
    });
  });
};
```

### Options

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        /**
         * The authentication key required for API requests. (Required)
         *
         * Type: string.
         **/
        apiKey: '11111111-2222-3333-4444-555555555555',

        /**
         * Service information. (Required)
         * xxxx.microcms.io
         *
         * Type: string.
         **/
        serviceId: 'xxxx',

        /**
         * API information. (Required)
         * Multiple APIs can be specified.
         *
         * Type: array.
         **/
        apis: [
          {
            /**
             * API endpoint name. (Required)
             * https://xxxx.microcms.io/api/v1/posts
             *
             * Type: string.
             **/
            endpoint: 'posts',

            /**
             * Graphql type. (Optional)
             * This is used in GraphQL queries.
             * If type = 'post', the GraphQL types are named 'microcmsPost' and 'allMicrocmsPost'.
             *
             * Type: string.
             * Default: endpoint value.
             **/
            type: 'post',

            /**
             * microCMS's content type('list' or 'object'). (Optional)
             * if format is 'list', read all contents by fetching multiple times.
             *
             * Type: string.
             * Default: 'list'.
             **/
            format: 'object',

            /**
             * API request query options. (Optional)
             *
             * Type:
             *   draftKey: string.
             *   limit: number.
             *   offset: number.
             *   fields: string.
             *   filters: string.
             *   depth: number.
             * Default: {}.
             **/
            query: {
              draftKey: 'DRAFT_KEY',
              limit: 100,
              offset: 40,
              fields: ['id', 'title', 'body'].join(','),
              filters: 'tag[exists]',
              depth: 2,
            },
          },
        ],
      },
    },
  ],
};
```

#### filters

This plugin provides [filters query](https://microcms.io/blog/filters-parameter/) building helper.

```js
// gatsby-config.js
const {
  and,
  contains,
  exists,
} = require('gatsby-source-microcms/src/query-builder');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apis: [
          {
            query: {
              filters: and(contains('title', 'sale'), exists('tag')),
              //=> `title[contains]sale[and]tag[exists]`
            },
          },
        ],
      },
    },
  ],
};
```

Helper list:

- `equals` (alias: `eq`)

```js
equals('gender', 'women');
//=> gender[equals]women
```

- `notEquals` (alias: `neq`)

```js
notEquals('gender', 'women');
//=> gender[not_equals]women
```

- `lessThan` (alias: `lg`)

```js
lessThan('createdAt', '2019-11');
//=> createdAt[less_than]2019-11
```

- `greaterThan` (alias: `gt`)

```js
greaterThan('createdAt', '2019-11');
//=> createdAt[greater_than]2019-11
```

- `contains`

```js
contains('title', 'sale');
//=> title[contains]sale
```

- `exists`

```js
exists('nextLink');
//=> nextLink[exists]
```

- `notExists`

```js
notExists('nextLink');
//=> nextLink[not_exists]
```

- `beginsWith`

```js
beginsWith('publishedAt', '2019-11');
//=> publishedAt[begins_with]2019-11
```

- `and`

```js
and('filter1', 'filter2', ..., 'filter10')
//=> filter1[and]filter2[and]...[and]filter10
```

- `or`

```js
or('filter1', 'filter2', ..., 'filter10')
//=> filter1[or]filter2[or]...[or]filter10
```

## Contributing

日本語歓迎 🇯🇵
Pull Request, Issue お気軽にどうぞ。
