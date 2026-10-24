import { middlewareDefs } from './module/definitions/middlewares.js'

export default defineNitroConfig({

  // read at container start, never at build: NUXT_TOR_PROXY_SECRET / NUXT_TOR_SOCKS_URL override these
  // (envPrefix makes Nitro accept NUXT_ besides its own NITRO_ prefix); an empty secret denies every call
  runtimeConfig: {
    nitro: { envPrefix: 'NUXT_' },
    torProxySecret: '',
    torSocksUrl: 'socks5h://127.0.0.1:9050'
  },

  handlers: middlewareDefs.map(mw => ({
    middleware: true,
    route: '/',
    handler: `./runtime/middleware/${mw.file}`
  }))
});
