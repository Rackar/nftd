<template>
  <div class="row">
    <div class="col">
      <div class="q-pa-md">
        <q-carousel
          class="left-slide"
          swipeable
          animated
          arrows
          navigation
          v-model="slide"
          v-model:fullscreen="fullscreen"
          infinite
        >
          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />

          <template v-slot:control>
            <q-carousel-control position="bottom-right" :offset="[18, 18]">
              <q-btn
                push
                round
                dense
                color="white"
                text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
    </div>
    <div class="col">
      <div class="order-title">Awenon Maden</div>
      <div class="order-artist">Picasso</div>
      <div class="order-artist-info">Spaninsh,1881-1973</div>
      <div
        class="order-info"
      >sdfklsdf sldf ksdlf saldfj lasdkjf slfj asldflas fsadkf saldjf lasdfj lsadlfj sadf slkdjf asdlf jsdlf lskdf</div>
      <div class="order-price">19,000 ETH ($3,300.90)</div>
      <div class="order-countdown">count down {{countdownLeft}}</div>
      <div class="order-buy">
        <q-btn>Buy Now</q-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { date } from 'quasar';

export default defineComponent({
  name: 'NftOrdering',
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
    },
  },
  setup() {
    let countdownLeft = ref('');
    function formatTimegap(times: number) {
      let days = Math.floor(times / 3600 / 24);
      let hours = Math.floor(times / 3600) - days * 24;
      let mins = Math.floor(times / 60) - days * 24 * 60 - hours * 60;
      let secs = times - days * 24 * 3600 - hours * 3600 - mins * 60;
      let string = days ? days + ' ' : '';
      string += (hours ? hours : '00') + ':';
      string += (mins ? mins : '00') + ':';
      string += secs;
      return string;
    }
    function Countdown(endDate: string) {
      let now = Date.now();
      let diffSec = date.getDateDiff(endDate, now, 'seconds');
      countdownLeft.value = formatTimegap(diffSec);
    }
    onMounted(() => {
      let endDate = '2021-3-5';
      setInterval(() => Countdown(endDate), 1000);
    });
    let list = [{}];
    return {
      list,
      slide: ref(1),
      countdownLeft,
      fullscreen: ref(false),
    };
  },
});
</script>
<style>
.left-slide {
  border-radius: 12px;
}
.order-title {
  padding: 20px 0;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
}
.order-artist {
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}
.order-artist-info {
  padding: 10px 0;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
  border-bottom: 1px rgb(218, 218, 218) solid;
}
.order-info {
  color: gray;
  padding: 10px 0;
  border-bottom: 1px rgb(218, 218, 218) solid;
}
.order-price {
  padding: 10px 0;
  border-bottom: 1px rgb(218, 218, 218) solid;
}
.order-countdown {
  padding: 10px 0;
  /* border-bottom: 1px rgb(218, 218, 218) solid; */
}
</style>
