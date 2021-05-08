/*
 * @Descripttion:
 * @Author: Weize
 * @Date: 2021-05-08 21:06:51
 * @LastEditors: Weize
 * @LastEditTime: 2021-05-08 23:03:56
 */

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const portfinder = require("portfinder");
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
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
  },
  chainWebpack(config) {
    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial'
    //   }
    // ])

    // // when there are many pages, it will cause too many meaningless requests
    // config.plugins.delete('prefetch')

    // set svg-sprite-loader
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

    config.when(process.env.NODE_ENV !== "development", (config) => {
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
