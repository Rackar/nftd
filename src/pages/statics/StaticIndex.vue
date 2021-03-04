<template>
  <div>
    <section class="row top">
      <div class="col-2 offset-1 text-h5" offset-2>Filoli</div>
      <div class="col-2 offset-7">Connect Wallet About</div>
    </section>
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
      <img src="assets/images/banner.png" alt height="210" />
      <!-- <div class="banner-img">banner</div> -->
    </section>
    <section>
      <div class="row" style=" justify-content:center;">
        <div class="tabs">Most viewed</div>
        <div class="tabs">New</div>
        <div class="tabs">Price</div>
      </div>
      <div class="water-fall" v-if="data.length">
        <water-fall :data="data" gap="20px" width="240px" class="container" :delay="true">
          <template #default="item">
            <router-link to="/static">
              <div class="card">
                <img class="img" :src="item.src" />
                <!-- <p>{{ item.src }}</p> -->
                <div class="artist">{{item.artist}}</div>
                <div class="info">{{item.info}}</div>
                <!-- <div>{{item.v}}</div> -->
              </div>
            </router-link>
          </template>
        </water-fall>
      </div>
      <button class="halo-btn halo-btn-primary" @click.stop.prevent="fetchData">加载更多</button>
    </section>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { api } from '../../boot/axios';
import WaterFall from '../../libs/water-fall';

export default {
  components: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    WaterFall,
  },
  setup() {
    let initdata = [
      {
        key: '0',
        v: 1,
        src: 'assets/images/b1.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '1',
        v: 2,
        src: 'assets/images/b2.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '2',
        v: 3,
        src: 'assets/images/b3.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '3',
        v: 4,
        src: 'assets/images/b4.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '4',
        v: 5,
        src: 'assets/images/b5.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '5',
        v: 6,
        src: 'assets/images/b6.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '6',
        v: 7,
        src: 'assets/images/b7.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '7',
        v: 8,
        src: 'assets/images/b8.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '8',
        v: 9,
        src: 'assets/images/b9.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '9',
        v: 10,
        src: 'assets/images/b10.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '10',
        v: 11,
        src: 'assets/images/b11.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
      {
        key: '11',
        v: 12,
        src: 'assets/images/b12.png',
        artist: 'Picasso',
        info:
          'Bull. Screenprint in colors with embossing on Arches Cover paper',
        price: 12000,
      },
    ];
    const data = ref([]);
    let hasMore = ref(true);
    // function preview(url, e) {
    //   const { width, height } = e.target;
    //   photoSwipe.preview(width ? [{ src: url, w: width, h: height }] : url);
    // }
    function fetchData() {
      let newdata = [
        {
          key: '12',
          v: 1,
          src: 'assets/images/art1.jpg',
          artist: 'Picasso',
          info:
            'Bull. Screenprint in colors with embossing on Arches Cover paper',
          price: 12000,
        },
        {
          key: '13',
          v: 2,
          src: 'assets/images/art2.jpg',
          artist: 'Picasso',
          info:
            'Bull. Screenprint in colors with embossing on Arches Cover paper',
          price: 12000,
        },
      ];
      data.value = [...data.value, ...newdata];
      console.log(data);
    }
    function loadMore() {
      fetchData();
    }
    onMounted(() => {
      data.value.push(...initdata);
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
  min-height: 90vh;
}
.card {
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
  /* cursor: pointer; */
}
.card > .artist {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #222222;
}
.card > .info {
  font-size: 14px;
  color: rgba(34, 34, 34, 0.75);
}
.halo-btn {
  margin: 100px auto;
  display: block;
}
</style>