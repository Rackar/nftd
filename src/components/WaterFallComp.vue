<template>
  <div class="water-fall" v-if="list.length">
    <water-fall :data="list" gap="20px" width="240px" class="container" :delay="true">
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
  <button class="halo-btn halo-btn-primary" @click.stop.prevent="loadMore">加载更多</button>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import WaterFall from 'kuan-vue-waterfall';

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
    };
  },
};
</script>

<style>
</style>