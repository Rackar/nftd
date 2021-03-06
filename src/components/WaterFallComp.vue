<template>
  <div class="water-fall" v-if="list.length">
    <water-fall :data="list" gap="20px" width="240px" class="container" :delay="true">
      <template #default="item">
        <router-link to="/static">
          <div class="card">
            <div>
              <img class="img" :src="item.src" />
              <q-tooltip anchor="center middle" self="top middle">View details</q-tooltip>
            </div>
            <!-- <p>{{ item.src }}</p> -->
            <div class="artist">{{item.artist}}</div>
            <div class="info">{{item.info}}</div>
            <!-- <div>{{item.v}}</div> -->
          </div>
        </router-link>
      </template>
    </water-fall>
  </div>
  <q-btn class="halo-btn" @click="fetchData" label="More"></q-btn>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import WaterFall from '../libs/water-fall';

export default {
  name: 'WaterFallComponent',
  components: {
    WaterFall,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      validator: (d = []) => {
        return !d.length || d[0].key;
      },
    },
    url: {
      type: String,
      default: '',
    },
    delay: {
      type: Boolean,
      default: true,
    },
    gap: {
      type: [Number, String],
      default: 0,
    },
    width: {
      type: [Number, String],
      default: 200,
    },
  },
  setup(props) {
    let list = ref([]);
    list.value = [...props.data];
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
          src: 'assets/images/b1.png',
          artist: 'Picasso',
          info:
            'Bull. Screenprint in colors with embossing on Arches Cover paper',
          price: 12000,
        },
      ];
      list.value = [...list.value, ...newdata];
    }
    function loadMore() {
      fetchData();
    }
    onMounted(() => {
      //   list.value.push(...initdata);
    });
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
      list,
      loadMore,
      fetchData,
    };
  },
};
</script>

<style>
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
.card .img:hover {
  opacity: 0.5;
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
.card > .price {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #222222;
}
.halo-btn {
  margin: 30px auto;
  display: block;
}
</style>