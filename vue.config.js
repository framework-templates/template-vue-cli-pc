/*
 * @Descripttion:
 * @Author: Weize
 * @Date: 2021-05-08 21:06:51
 * @LastEditors: Weize
 * @LastEditTime: 2021-05-10 21:08:35
 */

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const portfinder = require("portfinder");
const isProduction = process.env.NODE_ENV === "production";
const externals = isProduction
  ? {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios", 
    }
  : {};

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: !isProduction,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: require("./src/mock/mock-server.js"),
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    // },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/less/var.less")],
    },
  },
  configureWebpack: {
    name: "Weize vue Element",
    resolve: {
      alias: {
        "@": resolve("src"),
      },
      extensions: [".js", ".json", ".vue", ".css", ".less"],
    },
    externals
  },
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(isProduction, (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          elementUI: {
            name: "chunk-elementUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
    });
    config.when(process.env.ENV === "analyzer", (config) => {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .tap((options) => {
          options.push({
            analyzerPort: async () => {
              await portfinder.getPortPromise();
            },
          });
          return options;
        });
    });
  },
};
