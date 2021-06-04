<template>
  <router-view class="main-body" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { init,requestLoginMetaMask ,web3instance} from "./web3/getWeb3";
// import { getLOLICanClaimOf } from "./web3/dloliMethods";

export default defineComponent({
  name: 'App',
  setup(){
   init()
  //   console.log(web3instance)
    // getLOLICanClaimOf('0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490')
  }
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
