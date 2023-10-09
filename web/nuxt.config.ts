
const npm_lifecycle_script = process.env.npm_lifecycle_script;
let apiBase = 'https://xbh.shuidi.cn';
let cdnURLApp = 'https://cdnxbh.shuidi.cn';
let cdnURL = 'https://staticcdn.shuidi.cn';
// @ts-ignore
if(npm_lifecycle_script.includes('test')){
  apiBase = 'https://xbh.test.pingansec.com';
  cdnURL = 'http://static.test.pingansec.com';
  cdnURLApp = ''
}

export default defineNuxtConfig({
  devtools: { enabled: true },
  // @ts-ignore
  server: {
    port: 3002, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  modules: [
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  antd:{
    // Options
  },

  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue({ file }: any) {
          return 140
        },
        propList: ['*'],
        exclude: /(node_module)/,
        selectorBlackList: ['html', '.rem-ignore']
      },
      "autoprefixer": {
        overrideBrowserslist: ["last 5 version", ">1%", "ie >=8"]
      },
    }
  },

  app: {
    head: {
      title: '信博汇',
      meta: [
        { name: 'description', content: '信博汇官网' }
      ],
      script: [
        { src: 'https://staticcdn.shuidi.cn/xbh-nuxt/js/fullpage.js', type: "text/javascript", body: true },
        { children: ' this.globalThis || (this.globalThis = this)' } // 解决浏览器端 chrome69 globalThis is not defined 报错
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://staticcdn.shuidi.cn/xbh-nuxt/css/fullpage.css'
        }
      ]
    },
    buildAssetsDir: 'static',   //修改站点资产的文件夹名称，默认是_nuxt
    rootId: "root", //自定义nuxt根元素id
    cdnURL: cdnURLApp
  },


  nitro: {
    devProxy: {
      "/shuidi_api": {
        target: "http://localhost:3000/", // 这里是接口地址
        changeOrigin: true,
        // pathRewrite: { '^/shuidi_api/' : '/' },
      },
    },
  },


  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: apiBase,
      cdnURL: cdnURL,
    }
  },

  vite: {
    build: {
      target: ['es2015']
    }
  }

})
