<template>
  <div class="main-page">
    <div class="row wrap">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <div class="left-side">
          <!-- <q-img :src="current.images[0]" style="max-width: 400px; height: 360px;" contain>
            <q-btn
              push
              round
              dense
              color="white"
              text-color="primary"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
          </q-img>-->
          <q-carousel
            class="left-slide"
            swipeable
            animated
            v-model="slide"
            v-model:fullscreen="fullscreen"
            infinite
          >
            <q-carousel-slide
              :name="i"
              v-for="(img,i) in current.images"
              :key="img"
              :img-src="img"
              class="left-slide-img"
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
          <div class="order-valuation">Current Valuation</div>
          <div class="order-number">
            <q-icon name="menu" class="order-countdown-money-icon" />
            <span class="order-number-eth">{{weiToCount(current.salesRevenue)}} ETH</span>
            <span
              class="order-number-usd"
            >($ {{(weiToCount(current.salesRevenue)*current.ethPrice).toFixed(2)}})</span>
          </div>
          <div class="order-countdown" v-if="countdownLeft =='' "></div>
          <div class="order-countdown" v-else-if=" countdownLeft === 'Sold Out.'">
            <span class="order-countdown-normal">Sold Out.</span>
          </div>
          <div class="order-countdown" v-else>
            <div class="order-countdown-normal">Sale ends in</div>

            <span class="order-countdown-time">
              {{countdownLeft}}
              <q-icon name="schedule" class="order-countdown-time-icon" />
            </span>
          </div>

          <div>
            <div class="order-buy">
              <q-btn
                color="black"
                class="full-width"
                @click="buyDnft"
                no-caps
                :disable="(current.loading || (countdownLeft == 'Sold Out.')|| (countdownLeft == ''))"
              >
                Buy Shares
                <q-inner-loading :showing="current.loading">
                  <q-spinner color="primary" size="3em" :thickness="2" />
                </q-inner-loading>
              </q-btn>
              <div @click="current.showBuyTips=true" class="tips-btn">· How NFT Crowdfunding works</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <q-card> -->
    <div style="padding-left:4px;padding-right:4px;">
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

      <!-- <q-tab-panel name="Details"> -->
      <div class="row">
        <div class="col-xs-12 col-md-12">
          <div class="about-artist-top">Details</div>
          <q-separator class="about-artist-sep" />
          <div class="about-des">{{current.description}}</div>
          <div class="about-des">{{descSplit}}</div>

          <!-- <div class="read-more">Read more</div> -->
        </div>
        <div class="col-xs-12 col-md-12">
          <div class="about-artist">Transactions</div>
          <div style="padding-bottom:30px;">
            <TransactionRecords :buyers="current.boughters" />
          </div>

          <!-- <div>address:0xdfsodfsjdflkjlj</div> -->
        </div>
      </div>
      <!-- </q-tab-panel> -->

      <!-- <q-tab-panel name="Commnets"> -->
      <div
        class="about-artist"
      >Comments {{current.comments.length?`(${current.comments.length})`:''}}</div>
      <q-input v-model="current.commentInput" class="comment-input" filled type="textarea">
        <q-btn v-if="current.commentInput.length" class="btn-save" @click="saveComment">save</q-btn>
      </q-input>

      <div v-for="comment in current.comments" :key="comment._id" class="comment-wrap">
        <q-avatar
          size="18px"
          font-size="16px"
          color="teal"
          text-color="white"
          icon="person"
          class="comment-avatar"
        ></q-avatar>
        <div
          class="comment-name"
        >{{comment.userAddress.substr(0, 5) + '...' + comment.userAddress.substr(-3, 5)}}</div>

        <div class="comment-content">{{comment.content}}</div>
      </div>
      <!-- </q-tab-panel> -->
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

    <q-dialog v-model="current.showBuyTips">
      <q-card class="tips-card">
        <h5>How NFT splitting works?</h5>
        <div>
          <div class="tips">
            <div class="tips-title">1. What am I buying into?</div>
            <div
              class="tips-content"
            >You are buying shares of the NFT. Each share is priced at a fixed price of 0.001 ETH.</div>
          </div>
          <div class="tips">
            <div class="tips-title">2. When will the sale of a NFT end?</div>
            <div
              class="tips-content"
            >The sale of a NFT ends 24 hours after the previous purchase of at least a share.</div>
          </div>
          <div class="tips">
            <div class="tips-title">3. Who will hold the NFT after sale ended?</div>
            <div
              class="tips-content"
            >The Filoli secretary will temporarily hold the NFT for all of its shareholders. The secretary, at the guidance of all the shareholders of the NFT, can take further action toward the NFT following their instructions.</div>
          </div>
          <div class="tips">
            <div class="tips-title">4. How are the sales proceed distributed?</div>
            <div class="tips-content">
              Artist or the owner of the NFT: 70%
              <br />Early investors: 25%
              <br />Filoli Platform: 5%
            </div>
          </div>
          <div class="tips">
            <div class="tips-title">5. How is money earned by Filoli platform distributed?</div>
            <div
              class="tips-content"
            >Filoli is a community platform owned by all of the LOLI token holders. Therefore, the secretary is responsible for distributing all of the earnings to Filoli shareholders according their LOLI holdings.</div>
          </div>
          <div class="tips-end">Revised 5/10/2021 by Filoli secretary (filoli2021@gmail.com)</div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, computed } from 'vue';
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
      showBuyTips: false,
    });
    let descSplit = computed(() => current.description.split('\n'));
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
            $q.notify('Success');
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
      current.comments = list.data.data.reverse();
    }
    async function saveComment() {
      let comment = {
        userAddress: await getMyAddress(),
        dNFTid: props.dnftid,
        content: current.commentInput,
      };
      let list = await api.post('comments', { comment: comment });
      if (list.data.status === 1) {
        current.comments.unshift(comment);
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
      descSplit,
    };
  },
});
</script>
<style>
.p-30 {
  padding: 30px;
}

.main-page {
  width: 1024px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.left-side {
  padding: 30px;
}
.left-slide {
  border-radius: 12px;
  /* padding: 30px; */
  /* margin: 30px; */
  /* width: 400px; */
}
.left-slide-img {
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 12px;
}
.right-side {
  /* margin: 30px; */
  padding-top: 30px;
  padding-left: 40px;
}
@media only screen and (max-width: 1440px) {
  .main-page {
    width: 800px;
  }
  .left-side {
    /* margin: 0; */
    /* width: 300px; */
    /* margin: 10px; */
    padding: 20px;
  }
  .right-side {
    margin: 0;
    padding: 0 14px;
  }
}
@media only screen and (max-width: 1024px) {
  .main-page {
    width: 100vw;
  }
}

.order-title {
  padding: 20px 0;
  font-size: 28px;
  line-height: 22px;
  /* font-weight: bold; */
}
.order-artist {
  font-size: 16px;
  line-height: 18px;
  border-top: 1px rgb(218, 218, 218) solid;
  padding-top: 20px;
  /* font-weight: bold; */
}
.order-artist-info {
  padding: 10px 0 20px;
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
  padding: 20px 0px 24px;
  /* width: 375px;
  background-color: rgb(233, 127, 127);
  margin: 12px 0;
  color: white; */
  /* border-bottom: 1px rgb(218, 218, 218) solid; */
}
.order-countdown-normal {
  padding-right: 8px;
  padding-bottom: 12px;
}
.order-countdown-time {
  color: white;
  background-color: #ff6262;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
}
.order-countdown-money-icon {
  padding-bottom: 4px;
  font-size: 22px;
}
.order-countdown-time-icon {
  /* vertical-align: center; */
  /* padding-bottom: 2px; */
  font-size: 18px;
  top: -4px;
}
.order-buy-wrap {
  width: 375px;
  padding: 10px;
  border: 1px solid whitesmoke;
}
.order-valuation {
  padding-top: 20px;
  font-size: 15px;
}
.order-number {
  padding-bottom: 20px;
  border-bottom: 1px rgb(218, 218, 218) solid;
}
.order-number-eth {
  font-size: 18px;
  color: black;
  padding-left: 4px;
  padding-right: 12px;
}
.order-number-usd {
  font-size: 14px;
  color: grey;
}
.comment-title {
  /* font-weight: bold; */
  font-size: 22px;
}
.comment-wrap {
  padding: 20px 40px;
  position: relative;
}
.comment-avatar {
  position: absolute;
  left: 5px;
  top: 18px;
}
.comment-name {
  width: 140px;
  line-height: 16px;
  font-size: 14px;
  color: #4b4b4b;
  padding-bottom: 6px;
}
.comment-content {
  font-size: 14px;
  line-height: 22px;
  color: #222222;
  /* padding-bottom: 10px; */
}
.comment-input .q-field__control {
  border-radius: 6px !important;
}
.btn-save {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.p-30 {
  /* padding: 30px 30px; */
}
.about-artist-top {
  padding-top: 30px;
  padding-bottom: 10px;
  font-size: 30px;
}
.about-artist {
  /* padding-top: 30px; */
  padding-bottom: 10px;
  font-size: 30px;
}
.about-artist-sep {
  color: #e4e4e4;
}
.about-des {
  /* padding-right: 20px;
  padding-bottom: 40px; */
  padding: 10px 20px 40px 10px;
  color: #222222;
  font-size: 16px;
}
.read-more {
  color: grey;
  cursor: pointer;
}
.sell-card {
  padding: 50px;
  text-align: center;
}
.tips-btn {
  cursor: pointer;
  margin-top: 10px;
  margin-left: 4px;
  color: #898989;
  font-size: 12px;
}
.tips-card {
  padding: 40px;
  text-align: left;
}
.tips-title {
  padding: 4px 0;
  font-weight: 600;
}
.tips-end {
  padding-top: 5px;
  color: gray;
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
  margin: 5px 45px 5px 40px;
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
