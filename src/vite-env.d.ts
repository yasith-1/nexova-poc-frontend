/// <reference types="vite/client" />
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#5674FF',
      },
    },
  },
  plugins: [],
};

export default config;

