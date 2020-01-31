
export default {
  mode: 'spa',
  head: {
    htmlAttrs: { lang: 'en' },
    title: '0xcert Verify',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  loading: { color: '#0971FF' },
  styleResources: {
    scss: [
      './assets/_mixins.scss'
    ]
  },
  css: [
  ],
  plugins: [
  ],
  scrollToTop: true,
  pageTransition: 'fade',
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  eslint: {
    quiet: true,
    fix: true
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'bottom-right',
    duration: 3000
  },
  axios: {
  },
  build: {
    extend (config, ctx) {}
  }
}
