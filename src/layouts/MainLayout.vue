<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>Filoli NFT Crowd-Funding Platform</q-toolbar-title>

        <div>Language</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <!-- <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>-->

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: '静态',
    caption: '',
    icon: 'public',
    link: '/',
  },
  {
    title: 'nft',
    caption: '',
    icon: 'list',
    link: '/nft',
  },
  {
    title: '框架',
    caption: 'MainPage',
    icon: 'public',
    link: '/test/',
  },
  {
    title: '发起众筹',
    caption: 'Add',
    icon: 'record_voice_over',
    link: '/test/add',
  },
  {
    title: '众筹列表',
    caption: 'List',
    icon: 'code',
    link: '/test/list',
  },

  {
    title: '瀑布流',
    caption: '',
    icon: 'list',
    link: '/test/water',
  },
  {
    title: '瀑布流组件',
    caption: '',
    icon: 'list',
    link: '/test/water2',
  },

  // {
  //   title: 'Discord Chat Channel',
  //   caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev'
  // },
  // {
  //   title: 'Forum',
  //   caption: 'forum.quasar.dev',
  //   icon: 'record_voice_over',
  //   link: 'https://forum.quasar.dev'
  // },
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev'
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev'
  // }
];

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
