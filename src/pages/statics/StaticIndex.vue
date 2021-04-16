<template>
  <div>
    <!-- <section class="banner">
      <img src="icons/banner@3x.png" alt style=" max-height: 210px" />
    </section>-->
    <section>
      <!-- <div class="row" style=" justify-content:center;">
        <div class="tabs">Ongoing</div>
        <div class="tabs">Past</div>
      </div>-->
      <WaterFallComp :data="data" @loadMore="fetchData" />
    </section>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue';
import { api } from '../../boot/axios';
import WaterFallComp from '../../components/WaterFallComp';
import { ABI_721_standard, ABI, address } from 'src/web3/config';
const Web3 = require('web3');
// import { useStorage } from '@vueuse/core';
import { useStore } from 'vuex';

export default {
  components: {
    WaterFallComp,
  },
  setup() {
    const $store = useStore();
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
    let current = reactive({
      dnfts: computed({
        get: () => $store.state.example.dnfts,
        set: (val) => {
          $store.commit('example/setDNFTs', val);
        },
      }),
    });
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
    function getNFTprice(dNFTid) {
      const web3 = new Web3(window.ethereum);
      const myContract = new web3.eth.Contract(ABI, address);
      return new Promise((resolve, reject) => {
        myContract.methods
          .idTodNFT(dNFTid)
          .call()
          .then(function (result) {
            console.log('dNFT status: ' + JSON.stringify(result));
            resolve(result);
            let dnft = {
              // 0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              // 1: '0x227897e07508229AA6F794D39681428351447201',
              // 2: '0',
              // 3: '1',
              // 4: '2',
              // 5: '1615366956',
              // 6: '0',
              // 7: false,
              // principal: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              // contractAd: '0x227897e07508229AA6F794D39681428351447201',
              // accProfitsPer_dNFT1e18: '0',
              // NFTid: '1',
              // dNFTid: '2',
              // lastBuyTimestamp: '1615366956',
              // salesRevenue: '0',
              // principalClaim: false,
            };
          })
          .catch((e) => console.log(e));
      });
    }
    onMounted(async () => {
      let res = await api.get('dnfts');
      let list = res.data.data.filter((nft) => {
        return nft.image && nft.image.substr(0, 4) === 'http';
      });
      list.reverse();

      data.value = [...list];
      // let gState = useStorage('cache', { dnfts: res.data.data });
      current.dnfts = res.data.data;
      console.log(current.dnfts);

      // console.log(gState);
      // for (let i = 0; i < data.value.length; i++) {
      //   const dnft = data.value[i];
      //   let status = await getNFTprice(dnft.dNFTid);
      //   debugger;
      //   dnft.selling = status.sellFinishTime ? false : true;
      //   dnft.price = (Web3.utils.fromWei(status.salesRevenue) * 1400).toFixed(
      //     2
      //   );
      // }
      // gState.dnfts = res.data.data;
      // console.log(gState.dnfts);
      // let nfts = list.data.data;
      // console.log(nfts);
      // let metaDatas = [];
      // for (let i = 0; i < nfts.length; i++) {
      //   const nft = nfts[i];
      //   const web3 = new Web3(window.ethereum);
      //   const myContract = new web3.eth.Contract(
      //     ABI_721_standard,
      //     nft.NFTCotract
      //   );

      //   //预计价格
      //   let dNFTs = await getNFTprice(nft.dNFTid);
      //   await myContract.methods
      //     .tokenURI(nft.NFTid)
      //     .call()
      //     .then(async (apiURL) => {
      //       if (apiURL === 'fly.io' || apiURL === 'walk.io') {
      //         nft.name = 'test name';
      //         nft.description = 'test description';
      //       } else {
      //         let obj = await api.get(apiURL);
      //         if (obj && obj.data.status === 1) {
      //           nft.name = obj.data.data.name;
      //           nft.description = obj.data.data.description;
      //           nft.image = obj.data.data.image;
      //         }
      //       }
      //     });
      //   nft.salesRevenue = dNFTs.salesRevenue;
      //   if (nft.image && nft.image.substr(0, 4) === 'http') {
      //   } else {
      //     nft.image =
      //       'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2887354198,2403429628&fm=26&gp=0.jpg';
      //   }
      //   metaDatas.push(nft);
      // }

      // data.value = [...metaDatas];
    });
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
      data: data,
      loadMore,
      fetchData,
      current,
    };
  },
};
</script>

<style>
/* .top {
  align-items: baseline;
  padding-top: 30px;
  border-bottom: rgb(219, 219, 219) 1px solid;
}
.right-toolbar {
  min-width: 140px;
  right: 30px;
  position: absolute;
} */
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
  width: 150px;
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