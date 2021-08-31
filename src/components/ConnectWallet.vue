<template>
  <!-- <span v-if="!current.account" @click="connect" class="connect"
    >Connect Wallet</span
  > -->
  <span v-if="!current.account" @click="newconnect" class="connect">
    Connect</span
  >
  <span v-else>
    <!-- <button @click="test">test</button> -->
    <q-btn
      label="add whitelist"
      class="btn-sell"
      v-if="current.isOwner"
      @click="current.showAddWhitelist = true"
    ></q-btn>
    <router-link to="/createnft" v-if="current.isArtist">
      <q-btn label="Create NFT" class="btn-sell"></q-btn>
    </router-link>

    <q-btn
      @click="wrapToSell"
      label="Sell"
      class="btn-sell"
      v-if="current.isArtist"
    ></q-btn>
    <q-avatar
      size="24px"
      font-size="18px"
      color="teal"
      text-color="white"
      icon="person"
      class="account-avatar"
      @click="showAccount()"
    ></q-avatar>
    <span @click="showAccount()" class="cursor-pointer">{{ acc }}</span>

    <!-- <span class="cursor-pointer" @click="copyAddress(current.account)">
      {{acc}}
      <q-tooltip anchor="bottom middle" self="center middle">
        Copy Account Address
      </q-tooltip>
    </span>-->
  </span>
  <q-dialog v-model="current.sellShow">
    <q-card class="nft-sell-card" style="border-radius: 15px">
      <div>NFT contract address (default: {{ address_NFT }})</div>
      <q-input outlined v-model="current.sellNFTaddress" />
      <div>
        NFT ID
        <!-- (available: {{current.myNFTs}}) -->
      </div>
      <q-input outlined v-model="current.sellNFTid" />
      <div>
        You need to approve this NFT to Filoli Contract Address first:
        {{ current.address }}
      </div>
      <q-btn @click="compConfirmSell" label="Confirm"></q-btn>
    </q-card>
  </q-dialog>
  <q-dialog v-model="current.showAddWhitelist">
    <q-card class="nft-sell-card" style="border-radius: 15px">
      <div>User address to add whitelist</div>
      <q-input outlined v-model="current.inputAddWhitelist" />

      <q-btn
        @click="compAddWhitelist(current.inputAddWhitelist)"
        label="Confirm"
      ></q-btn>
    </q-card>
  </q-dialog>
  <q-dialog v-model="current.showAccount">
    <q-card class="mydnft-card" style="border-radius: 15px">
      <!-- <h5>My LOLI:</h5>
      <div>
        {{ current.loliCanClaim }}
        {{ current.ifLoliClaimed ? '(claimed)' : '' }}
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            label="claimLOLI"
            :disable="current.ifLoliClaimed"
            @click="compLoliClaim()"
          />
        </div>
      </div> -->
      <h5>Sold:</h5>
      <div>
        <div class="money">
          {{ current.myOwnTotalClaim.toString().substr(0, 7) }} ETH (${{
            (current.myOwnTotalClaim * current.ethPrice).toFixed(2)
          }})
        </div>
        <div class="title">Total Dividends</div>
        <div v-for="dnft in current.myOwnList" :key="dnft.dNFTid">
          <q-item>
            <q-item-section avatar top>
              <q-img v-if="dnft.image" :src="dnft.image" size="34px"></q-img>
              <q-icon v-else name="account_tree" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label>{{ dnft.name }}</q-item-label>
              <q-item-label
                >{{ Math.round(dnft.price * 1000) / 1000 }} eth</q-item-label
              >
            </q-item-section>
            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  size="12px"
                  flat
                  dense
                  label="claim"
                  @click="compClaimByOwner(dnft.dNFTid)"
                  :disable="!dnft.finished"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>
        <q-inner-loading :showing="current.loadingMyOwnList">
          <q-spinner size="50px" color="primary" />Please wait. It may take up
          to 1 minute for your NFT to load...
        </q-inner-loading>
      </div>
      <h5>Bought:</h5>
      <div>
        <div class="money">
          {{ current.myTotalClaim.toString().substr(0, 7) }} ETH (${{
            (current.myTotalClaim * current.ethPrice).toFixed(2)
          }})
        </div>
        <div class="title">Total Dividends</div>
        <div v-for="dnft in current.myBoughtList" :key="dnft.dNFTid">
          <q-item>
            <q-item-section avatar top>
              <q-img v-if="dnft.image" :src="dnft.image" size="34px"></q-img>
              <q-icon v-else name="account_tree" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label>{{ dnft.name }}</q-item-label>
              <q-item-label
                >{{ Math.round(dnft.price * 1000) / 1000 }} eth</q-item-label
              >
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  size="12px"
                  flat
                  dense
                  label="claim"
                  @click="compClaim(dnft.dNFTid)"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>
        <q-inner-loading :showing="current.loadingMyBoughtList">
          <q-spinner size="50px" color="primary" />Please wait. It may take up
          to 1 minute for your NFT to load...
        </q-inner-loading>
      </div>

      <h5>LOLI:</h5>
      <div>
        <!-- <div class="money">
          {{ current.myTotalClaim.toString().substr(0, 7) }} ETH (${{
            (current.myTotalClaim * current.ethPrice).toFixed(2)
          }})
        </div>
        <div class="title">Total Dividends</div> -->
        <div v-for="dnft in current.myLoliList" :key="dnft.dNFTid">
          <q-item>
            <q-item-section avatar top>
              <q-img v-if="dnft.image" :src="dnft.image" size="34px"></q-img>
              <q-icon v-else name="account_tree" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label>{{ dnft.name }}</q-item-label>

              <q-item-label
                caption
                lines="1"
                v-if="dnftidCanGetLoli(dnft.dNFTid)"
                >{{ dnft.loliCanClaim }}</q-item-label
              >
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-item-label caption v-if="dnftidCanGetLoli(dnft.dNFTid)"
                  ><q-btn
                    size="12px"
                    flat
                    dense
                    label="claim LOLI"
                    :disable="dnft.isLoliClaimed"
                    @click="compLoliClaim(dnft)"
                /></q-item-label>
              </div>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>
        <q-inner-loading :showing="current.loadingMyBoughtList">
          <q-spinner size="50px" color="primary" />Please wait. It may take up
          to 1 minute for your NFT to load...
        </q-inner-loading>
      </div>
      <!-- <div>Field 1.02 ETH ($365.00)</div> -->
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, computed, onMounted, reactive, watch } from 'vue';
import Web3 from 'web3';
import { init, requestLoginMetaMask, web3instance } from '../web3/getWeb3';
import { address_DNFT, address_NFT, address_DLOLI } from '../web3/contract';

import { useQuasar, date, copyToClipboard } from 'quasar';
import { api } from '../boot/axios';
// import { useStorage } from '@vueuse/core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import {
  checkIsOwner,
  fundNFT,
  claim,
  claimByOwner,
  unClaimOf,
  wrapNFT,
  setArtist,
  idTodNFT,
  artistWhiteList,
} from '../web3/dnftMethods';

import {
  getLOLICanClaimOf,
  dNFTidToAccountToFetched,
  fetchLOLI,
  dnftidCanGetLoli,
} from '../web3/dloliMethods';

import { countToWei, weiToCount } from '../web3/Utils';
const config = {
  defaultSellLastingSecends: 86400,
  defaultUnitPrice: Web3.utils.toWei((0.001).toString()),
};

export default defineComponent({
  name: 'ConnectWallet',
  props: {},
  setup(props) {
    let router = useRouter();
    const $q = useQuasar();
    const $store = useStore();
    function connect() {
      // WalletInit();
      newWalletInit();
    }
    let current = reactive({
      account: '',
      network: '',
      myContract: {},
      sellShow: false,
      address: address_DNFT,
      sellNFTaddress: address_NFT,
      sellNFTid: '',
      showAccount: false,
      showAddWhitelist: false,
      inputAddWhitelist: '',
      myBoughtList: [],
      myLoliList: [],
      myTotalClaim: 0,
      myOwnList: [],
      myOwnTotalClaim: computed(() =>
        current.myOwnList
          .map((buy) => parseFloat(buy.price))
          .reduce((pre, cur) => pre + cur, 0)
      ),
      myNFTs: [],
      mydnftids: [],
      myOwndnftids: [],
      loadingMyOwnList: false,
      loadingMyBoughtList: false,
      thelist: [],
      isOwner: false, //默认关闭白名单设置按钮
      isArtist: true,
      ethPrice: 0,
    });
    let copyAddress = (url) => {
      copyToClipboard(url)
        .then(() => {
          $q.notify('Address copyed.');
          // 成功!
        })
        .catch(() => {
          $q.notify('Browser not allowed.');
          // 失败
        });
    };
    let wrapToSell = async () => {
      // debugger;
      current.sellNFTid = $store.state.example.nftIdApproved;
      current.sellShow = true;
    };

    let showAccount = async () => {
      current.showAccount = true;
    };

    watch(
      () => $store.state.example.dnfts,
      async () => {
        console.log('store dnft watched change.');
        await refreshAccountDetails(current.mydnftids);
        await refreshMyOwnDetails(current.myOwndnftids);
      }
    );
    watch(
      () => $store.state.example.userAddress,
      () => {
        init();
      }
    );
    async function getETHprice() {
      let res = await api.get('ethprice');
      current.ethPrice = res.data.data ? parseFloat(res.data.data) : 0;
    }

    async function tryGetdNFTs() {
      let dNFTs = $store.state.example.dnfts;
      return dNFTs;
    }

    async function refreshAccountDetails(dNFTids) {
      let dNFTs = await tryGetdNFTs();
      if (dNFTs.length) {
        current.loadingMyBoughtList = true;
        current.myBoughtList = [];
        for (let i = 0; i < dNFTids.length; i++) {
          const dNFTid = dNFTids[i];
          let unClaim;
          let loliCanClaim = 0;
          let isLoliClaimed = true;
          try {
            unClaim = await unClaimOf(dNFTid, current.account);
            if (dnftidCanGetLoli(dNFTid)) {
              let loliweis = await getLOLICanClaimOf(
                dNFTid,
                web3instance.account
              );
              loliCanClaim = Math.round(weiToCount(loliweis));
              isLoliClaimed = await dNFTidToAccountToFetched(
                dNFTid,
                current.account
              );
            }
          } catch (error) {
            return;
          } finally {
            current.loadingMyBoughtList = false;
          }
          let name = dNFTs.find((dNFT) => dNFT.dNFTid == dNFTid);
          let result = {
            dNFTid,
            loliCanClaim,
            isLoliClaimed,
            name: name ? name.name : '',
            image: name ? name.image : '',
            myAddress: current.account,
            price: weiToCount(unClaim),
          };
          if (result.price != '0') {
            current.myBoughtList.push(result);
          }
          if (!isLoliClaimed) {
            current.myLoliList.push(result);
          }
        }
        current.loadingMyBoughtList = false;

        current.myTotalClaim = current.myBoughtList
          .map((buy) => parseFloat(buy.price))
          .reduce((pre, cur) => pre + cur, 0);
      }
    }
    async function compLoliClaim(dnft) {
      dnft.isLoliClaimed = true;
      try {
        await fetchLOLI(dnft.dNFTid);
      } catch (error) {
        dnft.isLoliClaimed = false;
      }
    }
    async function refreshMyOwnDetails(dNFTids) {
      let dNFTs = await tryGetdNFTs();
      if (dNFTs.length) {
        current.loadingMyOwnList = true;
        current.myOwnList = [];
        for (let i = 0; i < dNFTids.length; i++) {
          const dNFTid = dNFTids[i];
          let cache;
          try {
            cache = await idTodNFT(dNFTid);
          } catch (error) {
            return;
          } finally {
            current.loadingMyOwnList = false;
          }
          let unClaim = weiToCount(cache.salesRevenue) * 0.7;
          let {
            lastBuyTimestamp,
            sellFinishTime,
            salesRevenue,
            principalCanClaim,
          } = cache;
          current.salesRevenue = salesRevenue;
          let finished = false;
          if (sellFinishTime) {
            finished = true;
          } else if (lastBuyTimestamp) {
            let endDate = date.addToDate(new Date(lastBuyTimestamp * 1000), {
              days: 1,
            });

            finished = endDate < Date.now();
          } else {
            finished = false;
          }
          let name = dNFTs.find((dNFT) => dNFT.dNFTid == dNFTid);
          let result = {
            dNFTid,
            name: name ? name.name : '',
            image: name ? name.image : '',
            myAddress: current.account,
            price: unClaim,
            finished,
          };
          if (result.price && principalCanClaim) {
            current.myOwnList.push(result);
          }
        }
        current.loadingMyOwnList = false;
      }
    }
    const compConfirmSell = async () => {
      let isin = await artistWhiteList(web3instance.account);
      isin = true; //FIXME 屏蔽白名单监测
      if (isin) {
        await _wrapNFT(current.sellNFTaddress, current.sellNFTid);
      } else {
        $q.notify('You are not in whitelist yet, contact us please.');
      }
    };
    //改完未测
    let init = async () => {
      $store.dispatch('example/getAllDNFTs');

      if (web3instance.account) {
        current.account = web3instance.account;
        current.isOwner = await checkIsOwner();
        // current.isArtist = await artistWhiteList(web3instance.account);
        current.isArtist = true; //FIXME 已屏蔽艺术家监测
        api.get('boughters?uad=' + web3instance.account).then(async (res) => {
          let data = res.data.data;
          let dNFTids = [...new Set(data.map((dnft) => dnft.dNFTid))];
          current.mydnftids = dNFTids;
          // debugger;
          refreshAccountDetails(dNFTids);
        });
        api.get('mydnfts?uad=' + web3instance.account).then(async (res) => {
          let dNFTids = res.data.data;
          current.myOwndnftids = dNFTids;
          // debugger;
          refreshMyOwnDetails(dNFTids);
        });

        // current.loliCanClaim = parseInt(
        //   weiToCount(await getLOLICanClaimOf(web3instance.account))
        // );
        // current.ifLoliClaimed = await dNFTidToAccountToFetched(dnftid,web3instance.account);
      }
    };

    let newWalletInit = async () => {
      await requestLoginMetaMask(() => {});
      if (provider) {
      } else {
        $q.notify('Please install MetaMask!');
      }
    };

    let test = async () => {};

    //添加艺术家ad到白名单中
    async function compAddWhitelist(userAddress) {
      if (!userAddress) return $q.notify('Must input user address.');
      try {
        let isin = await artistWhiteList(userAddress);
        if (!isin) {
          await setArtist(userAddress);
          $q.notify('Add to whitelist succeed.');
        } else {
          $q.notify('Aleady in whitelist');
        }
      } catch (error) {}
    }

    async function _wrapNFT(contractAd, NFTid) {
      $q.loading.show({
        message: 'Please wait a few seconds...',
      });
      try {
        const result = await wrapNFT(contractAd, NFTid);
        $q.notify('dnft wrapped.');
        $store.commit('example/setNftIdApproved', '');
        let dnftUrl = `/nft/${contractAd}/${NFTid}/${result.events.TransferSingle.returnValues.id}`;
        let res = api.get('refreshEvents?type=NewNFTwraped');

        current.sellShow = false;
        current.sellNFTid = '';
        router.push(dnftUrl);
      } catch (error) {
      } finally {
        $q.loading.hide();
      }
    }

    async function compClaimByOwner(dNFTid) {
      current.loadingMyOwnList = true;
      try {
        let result = await claimByOwner(dNFTid);
        await api.post('ownclaim', { dnftid: dNFTid });
        current.myOwnList = current.myOwnList.filter(
          (element) => element.dNFTid !== dNFTid
        );
      } catch (error) {
      } finally {
        current.loadingMyOwnList = false;
      }
    }
    async function compClaim(dNFTid) {
      $q.loading.show({
        message: 'Please wait a few seconds...',
      });
      try {
        await claim(dNFTid);
        $q.notify('Claim success');
        current.showAccount = false;
      } catch (error) {
      } finally {
        $q.loading.hide();
      }
    }
    ///分配出售NFT的钱给各股东
    async function comFundNFT(dNFTid, number) {
      await fundNFT(dNFTid, number);
    }

    async function newconnect() {
      await requestLoginMetaMask(() => {});
      init();
    }
    onMounted(() => {
      // WalletInit();
      init();
      getETHprice();
    });
    return {
      connect,
      current,
      test,
      acc: computed(
        () =>
          current.account.substr(0, 5) + '...' + current.account.substr(-3, 5)
      ),
      copyAddress,
      wrapToSell,
      compConfirmSell,
      address_NFT,
      compAddWhitelist,
      comFundNFT,
      compClaim,
      showAccount,
      compClaimByOwner,
      newconnect,
      compLoliClaim,
      dnftidCanGetLoli,
    };
  },
});
</script>
<style>
.connect {
  cursor: pointer;
  color: red;
  padding-right: 30px;
}
@media only screen and (max-width: 600px) {
  .connect {
    padding-right: 5px;
  }
  .mydnft-card {
    width: 350px;
  }
}
.btn-sell {
  margin-right: 15px;
}
.nft-sell-card {
  padding: 50px;
}
.mydnft-card {
  text-align: center;
  padding: 50px;
  width: 500px;
  min-width: 370px;
}
.account-avatar {
  cursor: pointer;
  margin-right: 10px;
}
.mydnft-name {
  font-weight: bold;
  font-size: 14px;
  color: black;
  border-top: 1px solid black;
}
.mydnft-name.selling {
  color: grey;
}
.mydnft-eth {
  font-weight: bold;
  font-size: 16px;
  color: black;
  padding: 0 20px;
}
.mydnft-eth.selling {
  color: grey;
}
.mydnft-card .money {
  font-size: 20px;
}
.mydnft-card .title {
  color: grey;
}
</style>
