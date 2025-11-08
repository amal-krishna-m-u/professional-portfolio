/// <reference types="vite/client" />

/**
 * Vite Environment Variables Type Definitions
 * This tells TypeScript about the environment variables available via import.meta.env
 */

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_USE_MOCK_DATA: string;
  // Add more environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
