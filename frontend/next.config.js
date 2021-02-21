require('dotenv').config()
const R = require('ramda')

module.exports = R.compose(
  require('next-optimized-images'),
  require('next-plugin-graphql'),
)({
  cssLoaderOptions: {
    localIdentName: '[local]__[hash:base64:5]',
  },

  cssModules: true,

  publicRuntimeConfig: {
    ACCEPT_IMAGES_MIME_TYPES: `image/gif, image/jpeg, image/pjpeg, image/png, image/svg+xml, image/tiff,
      image/vnd.microsoft.icon, image/vnd.wap.wbmp, image/webp`,

    ITEMS_PER_PAGE: 25,
    US_DATE_FORMAT: 'MM/DD/YYYY',
    ...R.pickBy((value, key) => key.startsWith('NEXT_PUBLIC_'), process.env),
  },

  serverRuntimeConfig: R.pickBy((_, key) => key.startsWith('NEXT_SERVER_'), process.env),
})
