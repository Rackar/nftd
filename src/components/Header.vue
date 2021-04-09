<template>
  <div>
    <section class="row top">
      <div class="left-toolbar">
        <router-link to="/">
          <img class="left-image" height="40" src="icons/logo@2x.png" alt srcset />
        </router-link>
        <!-- <span class="header-title">Filoli</span> -->
      </div>
      <div class="right-toolbar">
        <span class="right-title">
          <ConnectWallet />
        </span>
        <span class="right-title">
          <router-link to="/about">About</router-link>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import ConnectWallet from './ConnectWallet';

export default {
  components: { ConnectWallet },
  setup() {
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
    };
  },
};
</script>

<style>
.top {
  align-items: center;
  padding-top: 30px;
  padding-bottom: 4px;
  padding: 30px 50px 4px;
  border-bottom: rgb(219, 219, 219) 1px solid;
  justify-content: space-between;
}
@media only screen and (max-width: 1024px) {
  .top {
    padding: 10px;
  }
}

.header-title {
  font-size: 40px;
  line-height: 40px;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  margin-right: 10px;
}
.left-toolbar {
  /* align-self: flex-end; */
  /* vertical-align: bottom; */
  display: flex;
  align-items: flex-end;
}
.left-image {
  margin-right: 10px;
}
.right-toolbar {
  /* min-width: 140px; */
  /* right: 30px;
  position: absolute; */
}
.right-title {
  margin-right: 30px;
}
</style>