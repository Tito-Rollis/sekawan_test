import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// const env = loadEnv(mode, process.cwd(), '');
// https://vitejs.dev/config/
// export default ({mode}=>{
//   process.env = {...process.env, ...loadEnv(mode, process.cwd())};
//   return defineConfig({
//     // To access env vars here use process.env.TEST_VAR
//     plugins: [react()],
//   });
// })
export default defineConfig({
    envPrefix: 'REACT_APP_',
    plugins: [react()],
});
