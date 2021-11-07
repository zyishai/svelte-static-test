// import ssr from 'vite-plugin-ssr/plugin';
import viteSSR from 'vite-ssr/plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { windi } from 'svelte-windicss-preprocess';

export default {
  plugins: [
    svelte({
      preprocess: [windi({})],
    }),
    viteSSR({}),
  ],
};
