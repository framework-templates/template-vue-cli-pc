/*
 * @Descripttion:
 * @Author: Weize
 * @Date: 2021-04-27 15:32:38
 * @LastEditors: Weize
 * @LastEditTime: 2021-05-08 22:31:26
 */

const users = {
  token: {
    name: "Tuqiaotu",
  },
}

module.exports = [
  // get user info
  {
    url: "/user/info",
    type: "get",
    response: (config) => {
      const { token } = config.query
      const info = users[token]
      return {
        code: 200,
        data: info,
      }
    },
  },
]
