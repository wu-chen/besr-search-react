import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [{ path: '/search/:id', component: '@/pages/search/index' }],
    },
  ],
  fastRefresh: {},
});
