<template>
  <div class="about-main">
    <div class="about-content">
      Filoli is a NFT marketplace that features the ability to split NFTs and
      sell them to multiple investors, each of whom owns a portion of the NFT
      corresponding to the artwork.
    </div>
    <div class="about-content">
      Filoli is a decentralized project developed by volunteers and governed
      through the principles of separation of powers.
    </div>

    <div>
      <a
        class="paper-link"
        href="https://docs.google.com/document/d/12pBB5ptFt8HL8LeWuAnIYjrCrmAW3zz7FrhR3MgMcVM/edit?usp=sharing"
        >English Whitepaper</a
      >
    </div>
    <div>
      <a
        class="paper-link"
        href="https://docs.google.com/document/d/166RepLEx26eoI9WwQ6w_FbWRCerYQLCaaMkr_uJj3KI/edit?usp=sharing"
        >Chinese Whitepaper</a
      >
    </div>

    <p></p>
    <a href="https://discord.gg/evT2jawc" target="_blank">
      <img
        class="left-image"
        width="40"
        height="40"
        src="icons/discord@2x.png"
        alt
        srcset
      />
    </a>
    <a href="https://twitter.com/filo_li" target="_blank">
      <img
        class="left-image"
        width="40"
        height="40"
        src="icons/twitter@2x.png"
        alt
        srcset
      />
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
  height: calc(100vh - 120px);
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
    /* height: calc(100vh - 67px); */
    margin-left: 0;
    padding: 10px;
    width: auto;
    font-size: 16px;
    background-color: rgb(250, 253, 255);
    color: #222222;
  }
}
.about-content {
  padding: 8px 0;
}
.about-content-title {
  font-size: 22px;
  font-weight: bold;
}
.about-info {
  font-size: 20px;
  color: #898989;
}
.left-image {
  margin-right: 10px;
}

a:hover.paper-link {
  color: #5353c6;
}
</style>
