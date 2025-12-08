import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 여기서 프록시 설정을 함
    proxy: {
      // API 요청 (/api 로 시작하는 것들)
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      //로그인 요청
      '/loginProc': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      //회원가입 요청
      '/joinProc': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      //로그아웃 요청
      '/logout': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  }
})