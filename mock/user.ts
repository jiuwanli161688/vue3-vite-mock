const userMock = () => {
  return [
    {
      url: '/api/login',
      // url: '/login',
      method: 'post',
      response: ({ body }) => {
        console.log("login接口---模拟响应==body=", body)
        const { username, password } = body
        if (username === 'admin' && password === '123456') {
          return {
            code: 0,
            data: {
              token: 'mock-token'
            },
            msg: '登录成功'
          }
        }
        return {
          code: 1,
          msg: '用户名或密码错误'
        }
      }
    },
    {
      url: '/api/user/info',
      method: 'get',
      response: () => {
        return {
          code: 0,
          data: {
            name: 'Admin',
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            roles: ['admin']
          }
        }
      }
    },
    {
      url: '/api/logout',
      method: 'post',
      response: () => {
        return {
          code: 0,
          data: null,
          msg: '退出成功'
        }
      }
    }
  ]
}
export default userMock