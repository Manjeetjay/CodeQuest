import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],

  build: {
    // Output directory
    outDir: 'dist',

    // Generate sourcemaps for debugging (disable for production if needed)
    sourcemap: false,

    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'editor': ['@monaco-editor/react', 'monaco-editor'],
        },
      },
    },

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
  },

  // Preview server configuration (for local testing)
  preview: {
    port: 4173,
    strictPort: false,
  },

  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    // SPA fallback - ensures all routes serve index.html for client-side routing
    historyApiFallback: true,
  },
})
