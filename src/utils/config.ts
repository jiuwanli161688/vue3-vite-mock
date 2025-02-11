interface Config {
  title: string
  apiBaseUrl: string
  uploadBaseUrl: string
}

const config: Config = {
  title: 'Vue Admin',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  uploadBaseUrl: import.meta.env.VITE_UPLOAD_BASE_URL || '/upload'
}

export default config