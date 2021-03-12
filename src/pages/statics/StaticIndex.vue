<template>
  <div>
    <Header />
    <section class="row" style=" justify-content:center;padding-top:20px;">
      <div class="col" style="max-width: 220px;  ">
        <q-input filled bottom-slots v-model="text" label="Search" maxlength="20" :dense="dense">
          <template v-slot:append>
            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
            <q-icon name="search" />
          </template>

          <!-- <template v-slot:hint>Field hint</template> -->
        </q-input>
      </div>
    </section>
    <section class="banner">
      <img src="icons/banner@3x.png" alt height="210" />
      <!-- <div class="banner-img">banner</div> -->
    </section>
    <section>
      <div class="row" style=" justify-content:center;">
        <div class="tabs">Most viewed</div>
        <div class="tabs">New</div>
        <div class="tabs">Price</div>
      </div>
      <WaterFallComp :data="data" @loadMore="fetchData" />
      <!-- <div class="water-fall" v-if="data.length">
        <water-fall :data="data" gap="20px" width="240px" class="container" :delay="true">
          <template #default="item">
            <router-link to="/static/nft">
              <div class="card">
                <div>
                  <img class="img" :src="item.src" />
                  <q-tooltip anchor="center middle" self="top middle">View details</q-tooltip>
                </div>

                <div class="name">{{item.name}}</div>
                <div class="info">{{item.info}}</div>
                <div class="price">{{item.price}} ETH</div>
              </div>
            </router-link>
          </template>
        </water-fall>
      </div>-->
      <!-- <q-btn class="halo-btn" @click="fetchData" label="More"></q-btn> -->
    </section>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { api } from '../../boot/axios';
// import WaterFall from '../../libs/water-fall';
import Header from '../../components/Header.vue';
import WaterFallComp from '../../components/WaterFallComp';
import { ABI_721_standard } from 'src/web3/config';
const Web3 = require('web3');

export default {
  components: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // WaterFall,
    WaterFallComp,
    Header,
  },
  setup() {
    let initdata = [
      {
        key: '0',
        NFTid: 1,
        dNFTid: 1,
        image: 'assets/images/b1.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '1',
        NFTid: 2,
        dNFTid: 1,
        image: 'assets/images/b2.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '2',
        NFTid: 3,
        dNFTid: 1,
        image: 'assets/images/b3.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '3',
        NFTid: 4,
        dNFTid: 1,
        image: 'assets/images/b4.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '4',
        NFTid: 5,
        dNFTid: 1,
        image: 'assets/images/b5.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '5',
        NFTid: 6,
        dNFTid: 1,
        image: 'assets/images/b6.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '6',
        NFTid: 7,
        dNFTid: 2,
        image: 'assets/images/b7.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '7',
        NFTid: 8,
        dNFTid: 2,
        image: 'assets/images/b8.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '8',
        NFTid: 9,
        dNFTid: 2,
        image: 'assets/images/b9.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '9',
        NFTid: 10,
        dNFTid: 2,
        image: 'assets/images/b10.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '10',
        NFTid: 11,
        dNFTid: 2,
        image: 'assets/images/b11.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
      {
        key: '11',
        NFTid: 12,
        dNFTid: 2,
        image: 'assets/images/b12.png',
        name: 'Picasso',
        description:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
        NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
      },
    ];
    let data = ref([]);
    let hasMore = ref(true);
    // function preview(url, e) {
    //   const { width, height } = e.target;
    //   photoSwipe.preview(width ? [{ src: url, w: width, h: height }] : url);
    // }
    function fetchData() {
      let newdata = [
        {
          key: '12',
          NFTid: 1,
          image: 'assets/images/art1.jpg',
          name: 'Picasso',
          description:
            'Bull. Screenprint in colors with embossing on Arches Cover paper',
          price: 12000,
          NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
        },
        {
          key: '13',
          NFTid: 2,
          image: 'assets/images/art2.jpg',
          name: 'Picasso',
          description:
            'Bull. Screenprint in colors with embossing on Arches Cover paper',
          price: 12000,
          NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
        },
      ];
      data.value = [...data.value, ...initdata];
      console.log(data);
    }
    function loadMore() {
      fetchData();
    }
    onMounted(async () => {
      let list = await api.get('dnfts');
      let nfts = list.data.data;
      let metaDatas = [];
      nfts.forEach(async (nft) => {
        const web3 = new Web3(window.ethereum);
        const myContract = new web3.eth.Contract(
          ABI_721_standard,
          nft.NFTCotract
        ); //nft

        //TODO 在元数据符合标准时调用
        // debugger;
        // await myContract.methods
        //   .tokenURI(nft.NFTid)
        //   .call()
        //   .then((meta) => {
        //     meta.NFTCotract = nft.NFTCotract;
        //     meta.NFTid = nft.NFTid;
        //     meta.dNFTid = nft.dNFTid;
        //     metaDatas.push(meta);
        //   });
      });

      console.log(metaDatas);

      data.value = [...initdata, ...metaDatas];
    });
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
      data: data,
      loadMore,
      fetchData,
    };
  },
};
</script>

<style>
.top {
  align-items: baseline;
  padding-top: 30px;
  /* padding-bottom: 4px; */
  border-bottom: rgb(219, 219, 219) 1px solid;
}
.right-toolbar {
  min-width: 140px;
  right: 30px;
  position: absolute;
}
.banner {
  display: 'flex';
  position: 'relative';
  align-items: 'center';
  align-self: 'center';
  flex-direction: 'row';
  margin-top: '40px';
  background-image: 'linear-gradient(44.99999999999997deg, #0065F6 0%,#2F9BFF 100%)';
  overflow: 'hidden';
  text-align: center;
}
.banner-img {
  height: 160px;
  background-color: blue;
}
.tabs {
  width: 200px;
  text-align: center;
  font-size: 30px;
  color: #4a4a4a;
}
.container {
  /* min-height: 90vh; */
}
/* .card {
  padding: 10px;
  background-color: white;
  border-radius: 3px;
  color: #666;
  line-height: 1.5;
  word-break: break-all;
}
.card .img {
  width: 100%;
  margin-bottom: 5px;
}
.card .img:hover {
  opacity: 0.5;
}
.card > .name {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #222222;
}
.card > .info {
  font-size: 14px;
  color: rgba(34, 34, 34, 0.75);
}
.card > .price {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #222222;
} */
/* .halo-btn {
  margin: 30px auto;
  display: block;
} */
</style>