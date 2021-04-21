<template>
  <div class="main-page">
    <div class="row wrap">
      <div class="col-xs-12 col-sm-12 col-md-6">
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
            <q-carousel-slide
              :name="i"
              v-for="(img,i) in current.images"
              :key="img"
              :img-src="img"
            />
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
      <div class="col-xs-12 col-sm-12 col-md-6">
        <div class="right-side">
          <div class="order-title">{{current.name}}</div>
          <div class="order-artist">{{current.artistName}}</div>
          <div class="order-artist-info">{{current.artistInfo}}</div>
          <!-- <div
            class="order-info"
          >sdfklsdf sldf ksdlf saldfj lasdkjf slfj asldflas fsadkf saldjf lasdfj lsadlfj sadf slkdjf asdlf jsdlf lskdf</div>
          <div class="order-price">19,000 ETH ($3,300.90)</div>-->

          <div class="order-countdown">
            <span v-show="countdownLeft !== 'Sold Out.'" class="order-countdown-normal">Sale ends in</span>
            <span class="order-countdown-bold">{{countdownLeft}}</span>
          </div>
          <div class="order-buy-wrap">
            <div class="order-valuation">Current Valuation</div>
            <div class="order-number">
              <span class="order-number-eth">{{weiToCount(current.salesRevenue)}} ETH</span>
              <span
                class="order-number-usd"
              >($ {{(weiToCount(current.salesRevenue)*current.ethPrice).toFixed(2)}})</span>
            </div>

            <div class="order-buy">
              <q-btn
                color="blue"
                class="full-width"
                @click="buyDnft"
                :disable="(current.loading || (countdownLeft == 'Sold Out.'))"
              >
                Buy Shares
                <q-inner-loading :showing="current.loading">
                  <q-spinner color="primary" size="3em" :thickness="2" />
                </q-inner-loading>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <q-card> -->
    <div>
      <!-- <q-tabs
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
      </q-tabs>-->

      <q-separator />

      <q-tab-panel name="Details">
        <div class="row">
          <div class="col-xs-12 col-md-12">
            <div class="about-artist">Details</div>
            <div class="about-des">{{current.description}}</div>
            <!-- <div class="read-more">Read more</div> -->
          </div>
          <div class="col-xs-12 col-md-12">
            <div class="about-artist">Transactions</div>
            <TransactionRecords :buyers="current.boughters" />
            <!-- <div>address:0xdfsodfsjdflkjlj</div> -->
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="Commnets">
        <div class="about-artist">Comments</div>
        <q-input v-model="current.commentInput" filled type="textarea">
          <q-btn v-if="current.commentInput.length" class="btn-save" @click="saveComment">save</q-btn>
        </q-input>

        <div class="comment-title">{{current.comments.length}} Comments</div>
        <div v-for="comment in current.comments" :key="comment._id" class="flex">
          <div
            class="comment-name"
          >{{comment.userAddress.substr(0, 5) + '...' + comment.userAddress.substr(-3, 5)}}</div>

          <div class="comment-content">{{comment.content}}</div>
        </div>
      </q-tab-panel>
    </div>

    <!-- </q-card> -->
    <q-dialog v-model="current.showBuytab">
      <q-card class="sell-card">
        <div>How many shares would you like to buy?</div>
        <div class="sell-title">{{current.name}}</div>
        <div>Current Valuation {{weiToCount(current.salesRevenue)}} ETH ($ {{(weiToCount(current.salesRevenue)*current.ethPrice).toFixed(2)}})</div>
        <div>{{current.boughters.reduce((pre,cur)=>pre+parseInt(cur.count),0)}} shares issued</div>
        <q-input outlined v-model="current.count" class="sell-input" />

        <div class="flex">
          <q-btn
            class="sell-input-btn"
            :class="current.count==1?'btn-active':''"
            @click="current.count=1"
          >1</q-btn>
          <q-btn
            class="sell-input-btn"
            :class="current.count==10?'btn-active':''"
            @click="current.count=10"
          >10</q-btn>
          <q-btn
            class="sell-input-btn"
            :class="current.count==100?'btn-active':''"
            @click="current.count=100"
          >100</q-btn>
          <q-btn
            class="sell-input-btn"
            :class="current.count==200?'btn-active':''"
            @click="current.count=200"
          >200</q-btn>
          <q-btn
            class="sell-input-btn"
            :class="current.count==500?'btn-active':''"
            @click="current.count=500"
          >500</q-btn>
          <q-btn
            class="sell-input-btn"
            :class="current.count==1000?'btn-active':''"
            @click="current.count=1000"
          >1000</q-btn>
        </div>
        <q-btn @click="confirmBuy" label="Pay with Metamask" class="btn-confirm"></q-btn>
        <div>* Only Metamask wallet is support at this moment.</div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue';
import { date, useQuasar } from 'quasar';
import TransactionRecords from '../../components/TransactionRecords.vue';
import {
  ABI,
  address,
  getMyAddress,
  justEnableMetamask,
} from 'src/web3/config';
import { api } from '../../boot/axios';
const Web3 = require('web3');

export default defineComponent({
  name: 'NftOrdering',
  components: { TransactionRecords },
  props: {
    nftcontract: {
      type: String,
      required: true,
    },
    nftid: {
      type: String,
      required: true,
    },
    dnftid: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
    },
  },
  setup(props) {
    let $q = useQuasar();
    let countdownLeft = ref('');
    let current = reactive({
      showBuytab: false,
      count: 1,
      loading: false,
      boughters: [],
      comments: [],
      commentInput: '',
      images: [],
      name: '',
      description: '',
      artistName: '',
      artistInfo: '',
      salesRevenue: '',
      ethPrice: 0,
    });

    function init() {
      const provider = new Web3.providers.WebsocketProvider(
        'wss://kovan.infura.io/ws/v3/bd6e30f7beaf4dc9ad34adf9792bd509',
        {
          clientConfig: {
            keepalive: true,
            keepaliveInterval: 60000, // milliseconds
          },
        }
      );
      const web3 = new Web3(window.ethereum || provider);
      const myContract = new web3.eth.Contract(ABI, address); //nft
      return myContract;
    }
    function countToWei(number = 1) {
      return Web3.utils.toWei((number * 0.001).toString());
    }
    function weiToCount(amount) {
      return Web3.utils.fromWei(amount);
    }
    let countdownInterval;
    function setCountDownTime(endDate) {
      clearInterval(countdownInterval);
      if (endDate > Date.now()) {
        countdownInterval = setInterval(() => Countdown(endDate), 1000);
      } else {
        countdownLeft.value = 'Sold Out.';
      }
    }
    function getCountdown() {
      let myContract = init();
      return new Promise((resolve, reject) => {
        myContract.methods
          .idTodNFT(props.dnftid)
          .call()
          .then(function (result) {
            let { lastBuyTimestamp, sellFinishTime, salesRevenue } = result;
            current.salesRevenue = salesRevenue;
            if (sellFinishTime) {
              let endDate = new Date(sellFinishTime * 1000);
              setCountDownTime(endDate);
              // if (endDate > Date.now()) {
              //   setInterval(() => Countdown(endDate), 1000);
              // } else {
              //   countdownLeft.value = 'Sold Out.';
              // }
            } else if (lastBuyTimestamp) {
              // let endDate = new Date(sellFinishTime)
              let endDate = date.addToDate(new Date(lastBuyTimestamp * 1000), {
                days: 1,
              });
              setCountDownTime(endDate);
              // .toString();
              // if (endDate > Date.now()) {
              //   setInterval(() => Countdown(endDate), 1000);
              // } else {
              //   countdownLeft.value = 'Sold Out.';
              // }
            } else {
              let endDate = date.addToDate(Date.now(), { days: 1 });
              setCountDownTime(endDate);
            }
            resolve(result);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
    function dNFTbuyer(dNFTid, number = 1) {
      let myContract = init();
      current.showBuytab = false;
      current.loading = true;
      return new Promise((resolve, reject) => {
        myContract.methods
          .dNFTbuyer(dNFTid)
          .send({
            from: window.ethereum.selectedAddress,
            value: countToWei(number),
          })
          .then(function (result) {
            current.loading = false;
            console.log('dNFT buy status: ' + JSON.stringify(result));
            $q.notify('success');
            getCountdown();
            current.boughters.push({
              Buyer: window.ethereum.selectedAddress,
              count: number,
              updatedAt: new Date(),
            });
            resolve(result);
          })
          .catch((e) => {
            current.loading = false;
            console.log(e);
          });
      });
    }
    async function getNFTmeta() {
      let res = await api.get('nfts?id=' + props.nftid);
      let meta = res.data.data;
      current.name = meta.name;
      current.description = meta.description;
      current.images = [meta.image];
      current.artistName = meta.artistName;
      current.artistInfo = meta.artistInfo;
    }
    async function getETHprice() {
      let res = await api.get('ethprice');
      current.ethPrice = res.data.data ? parseFloat(res.data.data) : 0;
    }
    async function getBoughtHistory() {
      try {
        let list = await api.get('boughters?id=' + props.dnftid);
        // debugger;
        current.boughters = list.data.data
          .filter((ele) => ele.amount !== '0')
          .map((ele) => {
            ele.count = weiToCount(ele.amount);
            return ele;
          });
      } catch (error) {
        current.boughters = [];
      }
    }
    async function getComment() {
      let list = await api.get('comments?id=' + props.dnftid);
      // debugger;
      current.comments = list.data.data;
    }
    async function saveComment() {
      let comment = {
        userAddress: await getMyAddress(),
        dNFTid: props.dnftid,
        content: current.commentInput,
      };
      let list = await api.post('comments', { comment: comment });
      if (list.data.status === 1) {
        current.comments.push(comment);
        current.commentInput = '';
      }
      // current.comments = list.data.data;
    }
    function formatTimegap(times) {
      let days = Math.floor(times / 3600 / 24);
      let hours = Math.floor(times / 3600) - days * 24;
      let mins = Math.floor(times / 60) - days * 24 * 60 - hours * 60;
      let secs = times - days * 24 * 3600 - hours * 3600 - mins * 60;
      let string = days ? days + ' ' : '';
      string += (hours ? hours : '00') + ':';
      string += (mins ? (mins > 9 ? mins : '0' + mins) : '00') + ':';
      string += (secs > 9 ? '' : '0') + secs;
      return string;
    }
    function Countdown(endDate) {
      let now = Date.now();
      let diffSec = date.getDateDiff(endDate, now, 'seconds');
      countdownLeft.value = formatTimegap(diffSec);
    }

    async function buyDnft() {
      await justEnableMetamask();
      current.showBuytab = true;
    }
    function confirmBuy() {
      dNFTbuyer(props.dnftid, current.count);
    }
    onMounted(async () => {
      getNFTmeta();
      getCountdown();
      getBoughtHistory();
      getComment();
      getETHprice();
    });
    let list = [{}];
    return {
      list,
      slide: ref(0),
      countdownLeft,
      fullscreen: ref(false),
      tab: ref('Details'),
      current,
      buyDnft,
      confirmBuy,
      saveComment,
      weiToCount,
    };
  },
});
</script>
<style>
.main-page {
  width: 1024px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.left-slide {
  border-radius: 12px;
  margin: 30px;
  /* width: 400px; */
}
.right-side {
  margin: 30px;
}
@media only screen and (max-width: 1440px) {
  .main-page {
    width: 800px;
  }
  .left-slide {
    /* margin: 0; */
    /* width: 300px; */
  }
  .right-side {
    /* margin: 0; */
  }
}
@media only screen and (max-width: 1024px) {
  .main-page {
    width: 400px;
  }
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
  color: gray;
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
  padding: 10px 20px;
  width: 240px;
  background-color: rgb(233, 127, 127);
  margin: 12px 0;
  color: white;
  /* border-bottom: 1px rgb(218, 218, 218) solid; */
}
.order-countdown-normal {
  padding-right: 8px;
}
.order-countdown-bold {
  font-weight: bold;
}
.order-buy-wrap {
  width: 240px;
  padding: 10px;
  border: 1px solid whitesmoke;
}
.order-valuation {
  font-size: 15px;
}
.order-number {
  margin-top: 6px;
  margin-bottom: 12px;
}
.order-number-eth {
  font-size: 18px;
  color: black;
}
.order-number-usd {
  font-size: 14px;
  color: grey;
}
.comment-title {
  font-weight: bold;
  font-size: 16px;
}
.comment-name {
  width: 140px;
  line-height: 30px;
}
.comment-content {
  line-height: 30px;
}
.btn-save {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.p-30 {
  /* padding: 30px 30px; */
}
.about-artist {
  padding-top: 30px;
  font-size: 22px;
}
.about-des {
  /* padding-right: 20px;
  padding-bottom: 40px; */
  padding: 10px 20px 40px 10px;
}
.read-more {
  color: grey;
  cursor: pointer;
}
.sell-card {
  padding: 50px;
  text-align: center;
}
.sell-title {
  font-size: 26px;
  font-weight: bold;
}
.sell-input {
  width: 160px;
  margin: 10px auto;
  font-size: 24px;
}
.sell-input-btn {
  width: 60px;
  margin: 5px 45px;
}
.btn-active {
  background-color: grey;
  color: white;
}
.btn-confirm {
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: black;
  color: white;
}
</style>
