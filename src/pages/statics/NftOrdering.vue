<template>
  <div class="main-page">
    <div class="row">
      <div class="col">
        <div>
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
        <div class="right-side">
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
    </div>
    <!-- <q-card> -->
    <div>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="Details" label="Details" />
        <q-tab name="Commnets" label="Commnets" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Details">
          <div class="row">
            <div class="col p-30">
              <div>About artist</div>
              <div>The girl of Avignon" is an oil painting created by Spanish painter Pablo Ruiz Picasso in 1907. Museum of modern art, New York.In this painting, there are five girls sitting or standing, scratching theirheads and posturing. In front of them is a small square stool with several clusters of grapes on it. The characters are completely distorted andillegible. The picture presents a single plane."I'm not a surrealist, I've never been divorced from reality. I always stayin the real situation This is Picasso's idea when he created "Guernica".Although people don't think Picasso is a realistic painter, in Picasso's idea, his paintings are not only based on the strongest emotional experience in his heart, but also the depiction of reality. Picasso is the most creative and far-reaching artistic genius in the history of western modernart in the 20th century. He is known as "the most complex" and knowshow to express</div>
              <div>Read more</div>
            </div>
            <div class="col p-30">
              <TransactionRecords />
              <div>address:0xdfsodfsjdflkjlj</div>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="Commnets">
          <q-input v-model="text" filled type="textarea" />

          <div class="comment-title">xx comments</div>
          <div v-for="x in 4" :key="x.key">
            <div class="comment-name">name</div>

            <div class="comment-content">sdfsdfsdofjslfdsldfkjsladfjlsadfiasdf</div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- </q-card> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { date } from 'quasar';
import TransactionRecords from '../../components/TransactionRecords.vue';

export default defineComponent({
  name: 'NftOrdering',
  components: { TransactionRecords },
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
      let endDate = date.addToDate(Date.now(), { days: 1 }).toString();
      setInterval(() => Countdown(endDate), 1000);
    });
    let list = [{}];
    return {
      list,
      slide: ref(1),
      countdownLeft,
      fullscreen: ref(false),
      tab: ref('Details'),
      text: ref(''),
    };
  },
});
</script>
<style>
.main-page {
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
@media only screen and (max-width: 1440px) {
  .main-page {
    width: 720px;
  }
}
@media only screen and (max-width: 720px) {
  .main-page {
    width: 400px;
  }
}
.left-slide {
  border-radius: 12px;
  margin: 30px;
  width: 400px;
}
.right-side {
  margin: 30px;
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
.comment-title {
  font-weight: bold;
  font-size: 16px;
}
.p-30 {
  padding: 30px 30px;
}
</style>
