<template>
  <div>
    <section class="row top">
      <div class="col-2 offset-1 left-toolbar">
        <img class="left-image" width="40" height="40" src="assets/logos/logo1.png" alt srcset />
        <span class="header-title">Filoli</span>

        <img class="left-image" width="40" height="40" src="assets/logos/chat.png" alt srcset />
        <img class="left-image" width="40" height="40" src="assets/logos/twitter.png" alt srcset />
      </div>
      <div class="right-toolbar">
        <span class="right-title">Connect Wallet</span>
        <span class="right-title">About</span>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
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
  /* padding-bottom: 4px; */
  border-bottom: rgb(219, 219, 219) 1px solid;
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
  min-width: 140px;
  right: 30px;
  position: absolute;
}
.right-title {
  margin-right: 30px;
}
</style>