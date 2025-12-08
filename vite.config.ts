import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 여기서 프록시 설정을 합니다
    proxy: {
      // 1. API 요청 (/api 로 시작하는 것들)
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      // 2. 로그인 요청
      '/loginProc': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      // 3. 회원가입 요청
      '/joinProc': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      // 4. 로그아웃 요청
      '/logout': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  }
})