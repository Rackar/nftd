<template>
  <!-- <h1 class="about-title">About</h1> -->
  <!-- <div class="about-bg"></div> -->
  <div class="about-main">
    <div class="about-content">
      Filoli is a NFT marketplace that features the ability to split NFTs and
      sell them to multiple investors, each of whom owns a portion of the NFT
      corresponding to the artwork.
    </div>
    <div class="about-content">
      Filoli is a decentralized project developed by volunteers and governed
      through the principles of separation of powers:
    </div>
    <div class="about-content">
      <div class="about-content-title">Filoli Board</div>
      Members of the Filoli board are anyone who hold at least 10 Million LOLI.
      Board members makes all decisions.
    </div>
    <div class="about-content">
      <div class="about-content-title">Secretary</div>
      Secretary is hired by the board to perform various miscellaneous tasks,
      including holding unsold LOLI.
    </div>
    <div class="about-content">
      <div class="about-content-title">Developers</div>
      Developers are hired by the board to develop and maintain filoli.io.
    </div>
    <div class="about-content">
      A total of 10 billion LOLI tokens has been issued for Filoli project.
      Initially, the only way to obtain LOLI is through purchasing NFTs on
      Filoli.io and getting LOLI rewards.
    </div>
    <!-- <div class="about-content">
      * Neither the developers nor the secretary are allocated a single LOLI
      token. There is no pre mining.
    </div>
    <div class="about-content">
      <div>#0001 Announcement by the Secretary：</div>
      Public sale of up to 1 million (10%) LOLI tokens through filoli.io. The
      sale will end immediately when $100,000 equivalent of ETH is raised.
    </div> -->
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

    <!-- <p
      class="about-info"
    >Filoli.io is in beta development. It is intended for internal usage only. Terms and Privacy policy will be avaiable soon.</p>
    <p class="about-info">
      Contact: filoli2021@gmail.com
      <br />All rights reserved 2021
    </p>-->
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
