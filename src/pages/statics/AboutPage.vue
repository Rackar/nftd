<template>
  <!-- <h1 class="about-title">About</h1> -->
  <!-- <div class="about-bg"></div> -->
  <div class="about-main">
    <p
      class="about-content"
    >Filoli is an online NFT showcase and sales platform that features the ability to split NFTs and sell them to multiple investors, each of whom owns a portion of the NFT corresponding to the artwork.</p>
    <p
      class="about-content"
    >Filoli is developed by a team of California-based artists and coders. All contents and tokens are stored on a public blockchain. Filoli is a decentralized project governed by LOLI token, which will be issued and distributed to stakeholders at a later date.</p>
    <p
      class="about-info"
    >Filoli.io is in beta development. It is intended for internal usage only. Terms and Privacy policy will be avaiable soon.</p>
    <p class="about-info">All rights reserved 2021</p>
    <a href="https://discord.gg/evT2jawc" target="_blank">
      <img class="left-image" width="40" height="40" src="icons/discord@2x.png" alt srcset />
    </a>
    <a href="https://twitter.com/filo_li" target="_blank">
      <img class="left-image" width="40" height="40" src="icons/twitter@2x.png" alt srcset />
    </a>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'About',
  components: {},
  setup() {
    return {};
  },
};
</script>
<style>
.about-title {
  padding-left: 80px;
}
.about-bg {
  background-image: url('/assets/images/bg.png');
  width: 1200px;
  height: 800px;
  position: absolute;
  z-index: -1;
  top: 400px;
  left: 80px;
}
.about-main {
  /* margin-left: 440px;
  width: 1000px; */

  padding: 80px;
  font-size: 18px;
  background-color: rgb(250, 253, 255);
  color: #222222;
}
@media only screen and (max-width: 1024px) {
  .about-title {
    padding-left: 20px;
    font-size: 28px;
  }
  .about-bg {
    display: none;
  }
  .about-main {
    margin-left: 0;
    padding: 10px;
    width: auto;
    font-size: 16px;
    background-color: aliceblue;
    color: #222222;
  }
}
.about-info {
  font-size: 20px;
  color: #898989;
}
.left-image {
  margin-right: 10px;
}
</style>
