
const npm_lifecycle_script = process.env.npm_lifecycle_script;
let apiBase = 'https://xbh.shuidi.cn';
let cdnURLApp = 'https://cdnxbh.shuidi.cn';
let cdnURL = 'https://staticcdn.shuidi.cn';
let shuidiApp = 'https://shuidi.cn';
// @ts-ignore
if(npm_lifecycle_script.includes('test')){
  apiBase = 'https://xbh.test.pingansec.com';
  cdnURL = 'http://static.test.pingansec.com';
  cdnURLApp = ''
  shuidiApp = 'https://shuidi.test.pingansec.com'
}

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vant/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  vant: {
    /** Options */
  },

  piniaPersistedstate: {
    storage: 'localStorage',
  },

  postcss: {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8",
          "last 10 versions", // 所有主流浏览器最近10版本用
        ],
        grid: true,
      },
      'postcss-pxtorem': {
        rootValue({ file }: any) {
          return file.indexOf('vant') !== -1 ? 37.5 : 108
        },
        propList: ['*'],
        exclude: /(node_module)/,
        selectorBlackList: ['html', '.rem-ignore']
      }
    }
  },


  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: apiBase,
      cdnURL: cdnURL,
      shuidiApp: shuidiApp,
    }
  },

  app: {
    head: {
      title: '信博汇',
      meta: [
        { name: 'description', content: '信博汇官网' }
      ],
    },
    buildAssetsDir: 'mobileStatic',
    rootId: "root", // 自定义nuxt根元素id
    cdnURL: cdnURLApp
  },

  vite: {
    build: {
      target: ['es2015']
    }
  },

  nitro: {
    devProxy: {
      "/api": {
        target: "https://xinbohui.test.pingansec.com", // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      },
    },
  },

})
