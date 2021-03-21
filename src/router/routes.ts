import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'add', component: () => import('pages/AddArticle.vue') },
      { path: 'list', component: () => import('pages/ArticleList.vue') },
      { path: 'water', component: () => import('components/waterfall.vue') },
      { path: 'water2', component: () => import('components/WaterFallCompWraper.vue') },

    ],
  },
  {
    path: '/',
    component: () => import('layouts/StaticLayout.vue'),
    children: [
      { path: '', component: () => import('pages/statics/StaticIndex.vue') },
      { path: 'nft/:nftcontract/:nftid/:dnftid', props: true, component: () => import('pages/statics/NftOrdering.vue') },
      { path: 'createnft', component: () => import('pages/statics/CreateNFT.vue') },
      { path: 'about', component: () => import('pages/statics/AboutPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
