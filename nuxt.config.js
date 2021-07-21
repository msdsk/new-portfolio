import variableOverride from '@thisisdeploy/scaffold-css/helpers/nuxt'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'me',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@thisisdeploy/scaffold-css', '~/assets/scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/style-resources',
    'vue-scrollto/nuxt',
    ['nuxt-font-loader-strategy', {
      fonts: [{
        fileExtensions: ['woff2', 'woff'],
        fontFamily: 'Latin Modern',
        fontFaces: [{
          src: '@/assets/fonts/latin-modern',
          fontWeight: 400,
          fontStyle: 'normal'
        }, {
          src: '@/assets/fonts/latin-modern-bold',
          fontWeight: 700,
          fontStyle: 'normal'
        }]
      }, {
        fileExtensions: ['woff2', 'woff'],
        fontFamily: 'Aleo',
        fontFaces: [{
          src: '@/assets/fonts/aleo-bold',
          fontWeight: 700,
          fontStyle: 'normal'
        }]
      }]
    }],
    'vue-scrollto/nuxt'
  ],

  styleResources: {
    scss: ['~/assets/scss/_variables.scss']
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      rehypePlugins: [
        '~/plugins/rehype-h1.js'
      ]
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { loaders, isClient, isDev }) {
      variableOverride(loaders)
      config.devtool = isClient ? 'source-map' : 'inline-source-map'
    }
  }
}
