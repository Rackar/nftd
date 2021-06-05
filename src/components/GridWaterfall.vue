<template>
  <div class="waterfall">
    <div
      class="item"
      :style="{ 'grid-row': 'auto / span ' + calcHeight(i) }"
      v-for="(item, i) in data"
      :key="item.id"
    >
      <router-link
        :to="'/nft/' + item.NFTCotract + '/' + item.NFTid + '/' + item.dNFTid"
      >
        <div class="card">
          <div>
            <img
              class="img"
              :src="item.image"
              :ref="
                (el) => {
                  if (el) divs[i] = el;
                }
              "
            />
            <q-tooltip anchor="center middle" self="top middle"
              >View details</q-tooltip
            >
          </div>
          <div class="artist">{{ item.name }}</div>
          <div class="info">{{ item.description }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUpdate, onUpdated } from 'vue';
let list = ref([]);

export default {
  name: 'WaterFallComponent',
  components: {},
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
    divs(thenew) {
      let he = [];
      for (let i = 0; i < divs.value.length; i++) {
        const image = thenew.value[i];
        image.onload = (img) => {
          let t = img.target.height;
          console.log(t);
          he[i] = t;
        };
      }
      hs.value = he;
    },
  },
  emits: {
    loadMore: null,
  },
  setup(props, context) {
    list.value = [...props.data];
    let divs = ref([]);
    let hs = ref([]);
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
    function calcHeight(i) {
      if (hs.value.length) {
        let h = hs.value[i] / 20;
        // debugger;
        return h;
      } else {
        return 5;
      }
    }
    onUpdated(() => {
      console.log(divs);
      //   hs.value = [];
    });
    onMounted(() => {
      //   hs.value = divs.value.map((div) => div.style.height);
      //   console.log(hs);
      //   list.value.push(...initdata);
    });
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
      list,
      loadMore,
      fetchData,
      calcHeight,
      divs,
    };
  },
};
</script>
<style>
.waterfall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(233px, 1fr));
  grid-gap: 2em;
  grid-auto-flow: row;
  grid-auto-rows: 20px;
}
.waterfall .item {
  width: 100%;
  background: #222;
  color: #ddd;
  /* grid-row: auto / span 5; */
}
/* .waterfall .item:nth-of-type(3n + 1) {
  grid-row: auto / span 5;
}
.waterfall .item:nth-of-type(3n + 2) {
  grid-row: auto / span 6;
}
.waterfall .item:nth-of-type(3n + 3) {
  grid-row: auto / span 8;
} */

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
