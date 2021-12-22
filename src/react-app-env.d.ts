/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_GOOGLE_CLIENT_ID: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_WS_URL: string;
    REACT_APP_AWS_ACCESS_KEY_ID: string;
    REACT_APP_AWS_SECRET_KEY: string;
    REACT_APP_AWS_BUCKET_NAME: string;
    REACT_APP_AWS_BUCKET_IMAGE_DIR_NAME: string;
    REACT_APP_STRIPE_API_KEY: string;
  }
}
