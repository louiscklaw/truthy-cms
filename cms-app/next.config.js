// Remove this if you're not using Fullcalendar features
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

nextConfigProd = withTM({
  basePath: '/cms',
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/welcome',
        permanent: true,
      },
    ];
  },
});

nextConfigDev = withTM({
  env: {
    GREETING: 'Hello World',
  },
  basePath: '/cms',
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  webpackDevMiddleware: config => {
    config.watchOptions = { poll: 1000, aggregateTimeout: 300 };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/welcome',
        permanent: true,
      },
    ];
  },
});

module.exports = process.env.NODE_ENV == 'development' ? nextConfigDev : nextConfigProd;
