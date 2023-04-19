const path = require('node:path')
module.exports = (options, webpack) => {
  const excludedLazyImportedDependencies = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'cache-manager/package.json',
  ]

  return {
    ...options,
    entry: {
      main: './src/main.ts',
    },
    devtool: 'source-map', // create source map for debugging
    externals: [],
    output: {
      ...options.output,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (excludedLazyImportedDependencies.includes(resource)) {
            try {
              require.resolve(resource)
            } catch (err) {
              return true
            }
          }
          return false
        },
      }),
    ],
    resolve: {
      // @see https://github.com/apollographql/apollo-server/issues/4983
      extensions: ['.ts', '.js'],
      alias: {
        graphql$: path.resolve(
            './node_modules/graphql/index.js',
        ),
      },
    },
  }
}
