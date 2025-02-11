import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode }) => {
  const mock = loadEnv(mode, process.cwd()).VITE_APP_USE_MOCK; // 是否启用 mock 功能
  const publicPath = loadEnv(mode, process.cwd()).VITE_PUBLIC_PATH; // 打包路径
  // const nodeEnv = process.env.VITE_USER_NODE_ENV; // 当前的环境
  const baseApi1 = loadEnv(mode, process.cwd()).VITE_APP_BASE_API1; // 基础 API 路径1
  const apiPrefix1 = loadEnv(mode, process.cwd()).VITE_APP_API_PREFIX1; // API 前缀1
  const baseApi2 = loadEnv(mode, process.cwd()).VITE_APP_BASE_API1; // 基础 API 路径2
  const apiPrefix2 = loadEnv(mode, process.cwd()).VITE_APP_API_PREFIX1; // API 前缀2

  console.log(mode,mock === "true"?"已启用":'未启用','啊===', baseApi1, apiPrefix1)
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: "mock", // mock 文件夹路径
        supportTs: true, // 是否读取 ts 文件
        // enable: mock === "true", // 是否启用 mock 功能
        localEnabled: mock === "true", // 开发环境是否启用
        prodEnabled: mock === "true", // 生产环境是否启用
        injectCode: ` import { setupProdMockServer } from './mockProdServer'; setupProdMockServer(); `, // 生产环境启用时注入的代码
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    server: {
      port: 3000,
      open: true,
      // host: true,
      proxy: {
        [apiPrefix1]: {
          target: baseApi1, // 目标 API 地址
          changeOrigin: true, // 是否允许跨域
          rewrite: (path) => path.replace(new RegExp(`^${apiPrefix1}`), ""), // 重写路径
        },
        [apiPrefix2]: {
          target: baseApi2, // 目标 API 地址
          changeOrigin: true, // 是否允许跨域
          rewrite: (path) => path.replace(new RegExp(`^${apiPrefix2}`), ""), // 重写路径
        },
      },
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"], // 预加载文件
      }
    }
  }
})