<template>
  <router-view class="main-body" />
</template>
<script lang="ts">
import { defineComponent, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { init, requestLoginMetaMask, web3instance } from './web3/getWeb3';
// import { getLOLICanClaimOf } from "./web3/dloliMethods";

export default defineComponent({
  name: 'App',
  setup() {
    const $store = useStore();
    init();
    onMounted(async () => {
      // await nextTick();

      setTimeout(() => {
        let ad = init();
        // debugger;
        $store.commit('example/setUserAddress', ad);
      }, 50);
    });
  },
});
</script>
<style>
@media only screen and (min-width: 1200px) {
  .main-body {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
