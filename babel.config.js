/*
 * @Descripttion: 
 * @Author: Weize
 * @Date: 2021-05-08 21:06:51
 * @LastEditors: Weize
 * @LastEditTime: 2021-05-08 22:02:35
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
}
