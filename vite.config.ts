
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    history: {
      // This will ensure that all routes are redirected to index.html
      fallback: true,
    },
    hmr: {
      // Try to solve WebSocket connection issues
      timeout: 120000,
      clientPort: 443
    }
  },
  define: {
    // Provide a fallback for the WebSocket token if it's not defined
    __WS_TOKEN__: JSON.stringify(process.env.WS_TOKEN || "dev-ws-token")
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
