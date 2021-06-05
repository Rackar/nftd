<template>
  <div class="water-fall" v-if="list.length">
    <water-fall
      :data="list"
      gap="30px"
      width="260px"
      class="container"
      :delay="true"
    >
      <template #default="item">
        <router-link
          :to="'/nft/' + item.NFTCotract + '/' + item.NFTid + '/' + item.dNFTid"
        >
          <div
            class="card"
            :class="{ sellout: item.Selling === 'false-fixme' }"
          >
            <div>
              <img class="img" :src="item.image" />
              <q-tooltip anchor="center middle" self="top middle"
                >View details</q-tooltip
              >
            </div>
            <div class="artist">{{ item.name }}</div>
            <div class="info">{{ item.description }}</div>
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
let list = ref([]);

export default {
  name: 'WaterFallComponent',
  components: {
    WaterFall,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      // validator: (d = []) => {
      //   return !d.length || d[0].key;
      // },
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
  watch: {
    data(thenew, theold) {
      list.value = [...thenew];
    },
  },
  emits: {
    loadMore: null,
  },
  setup(props, context) {
    list.value = [...props.data];
    let hasMore = ref(true);
    // function preview(url, e) {
    //   const { width, height } = e.target;
    //   photoSwipe.preview(width ? [{ src: url, w: width, h: height }] : url);
    // }
    function fetchData() {
      console.log(context);
      context.emit('loadMore');
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
.card.sellout {
  border: #c3baba 3px dotted;
  border-radius: 10px;
}
.card .img {
  width: 100%;
  border-radius: 15px 15px 0 0;
  /* margin-bottom: 5px; */
  /* cursor: pointer; */
}
.card .img:hover {
  opacity: 0.5;
}

.card > .artist {
  text-align: center;
  font-size: 20px;
  /* font-weight: bold; */
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
