<template>
  <span v-if="!current.account" @click="connect" class="connect">Connect Wallet</span>
  <span v-else>
    <!-- <button @click="test">test</button> -->
    <q-btn
      label="add whitelist"
      class="btn-sell"
      v-if="current.isOwner"
      @click="current.showAddWhitelist=true"
    ></q-btn>
    <router-link to="/createnft">
      <q-btn label="Create NFT" class="btn-sell"></q-btn>
    </router-link>

    <q-btn @click="wrapToSell" label="Sell" class="btn-sell"></q-btn>
    <q-avatar
      size="24px"
      font-size="18px"
      color="teal"
      text-color="white"
      icon="person"
      class="account-avatar"
      @click="showAccount()"
    ></q-avatar>
    <span class="cursor-pointer" @click="copyAddress(current.account)">
      {{acc}}
      <q-tooltip anchor="bottom middle" self="center middle">
        <!-- {{current.account}} -->
        Copy Account Address
      </q-tooltip>
    </span>
  </span>
  <q-dialog v-model="current.sellShow">
    <q-card class="nft-sell-card" style="border-radius: 15px;">
      <div>NFT contract address (default: {{address_721}})</div>
      <q-input outlined v-model="current.sellNFTaddress" />
      <div>
        NFT ID
        <!-- (available: {{current.myNFTs}}) -->
      </div>
      <q-input outlined v-model="current.sellNFTid" />
      <div>You need to approve this NFT to Filoli Contract Address first: {{current.address}}</div>
      <q-btn @click="confirmSell" label="Confirm"></q-btn>
    </q-card>
  </q-dialog>
  <q-dialog v-model="current.showAddWhitelist">
    <q-card class="nft-sell-card" style="border-radius: 15px;">
      <div>User address to add whitelist</div>
      <q-input outlined v-model="current.inputAddWhitelist" />

      <q-btn @click="addWhitelist(current.inputAddWhitelist)" label="Confirm"></q-btn>
    </q-card>
  </q-dialog>
  <q-dialog v-model="current.showAccount">
    <q-card class="mydnft-card" style="border-radius: 15px;">
      <div>{{current.myTotalClaim.toString().substr(0,7)}} ETH</div>
      <div>Total Dividends:</div>
      <div v-for="dnft in current.myBoughtList" :key="dnft.dNFTid">
        <!-- <div class="mydnft-name" :class="{selling:dnft.isSelling}">{{dnft.dNFTid}}{{dnft.name}}</div>
        <div class="mydnft-eth" :class="{selling:dnft.isSelling}">{{dnft.price.substr(0,7)}} eth</div>
        <q-btn @click="claim(dnft.dNFTid)" label="claim" />-->
        <q-item>
          <q-item-section avatar top>
            <q-img v-if="dnft.image" :src="dnft.image" size="34px"></q-img>
            <q-icon v-else name="account_tree" color="black" size="34px" />
          </q-item-section>

          <q-item-section top class="col-2 gt-sm">
            <q-item-label class="q-mt-sm">{{dnft.dNFTid}}-{{dnft.name}}</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{dnft.price.substr(0,7)}} eth</q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                label="claim"
                @click="claim(dnft.dNFTid)"
              />
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>
      <!-- <div>Field 1.02 ETH ($365.00)</div> -->
    </q-card>
  </q-dialog>
</template>

<script>
import {
  defineComponent,
  PropType,
  computed,
  ref,
  toRef,
  Ref,
  onMounted,
  reactive,
  watch,
} from 'vue';
const Web3 = require('web3');
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

import { useQuasar, copyToClipboard } from 'quasar';
import { ABI, address, ABI_N, address_N, address_721 } from '../web3/config';
import { api } from '../boot/axios';
// import { useStorage } from '@vueuse/core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

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
      address,
      sellNFTaddress: address_721,
      sellNFTid: '',
      showAccount: false,
      showAddWhitelist: false,
      inputAddWhitelist: '',
      myBoughtList: [],
      myTotalClaim: 0,
      myNFTs: [],
      mydnftids: [],
      thelist: [],
      isOwner: false, //默认关闭白名单设置按钮
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
      // await api.get('dnfts?uad=' + current.account).then((res) => {
      //   let list = res.data.data;
      //   current.myNFTs = list.map((data) => data.NFTid).join(',');
      // });

      current.sellNFTid = $store.state.example.nftIdApproved;
      current.sellShow = true;
    };

    let showAccount = async () => {
      // refreshAccountDetails(current.mydnftids);
      current.showAccount = true;
    };
    watch(
      () => $store.state.example.dnfts,
      () => {
        refreshAccountDetails(current.mydnftids);
      }
    );
    async function refreshAccountDetails(dNFTids) {
      let dNFTs = $store.state.example.dnfts;
      if (dNFTs.length) {
        current.myBoughtList = [];
        for (let i = 0; i < dNFTids.length; i++) {
          const dNFTid = dNFTids[i];
          let unClaim = await unClaimOf(dNFTid, current.account);
          let name = dNFTs.find((dNFT) => dNFT.dNFTid == dNFTid);
          let result = {
            dNFTid,
            name: name ? name.name : '',
            image: name ? name.image : '',
            myAddress: current.account,
            price: weiToCount(unClaim),
          };
          current.myBoughtList.push(result);
        }

        current.myTotalClaim = current.myBoughtList
          .map((buy) => parseFloat(buy.price))
          .reduce((pre, cur) => pre + cur, 0);
      }
    }
    const confirmSell = async () => {
      let isin = await artistWhiteList(current.account);
      if (isin) {
        await wrapNFT(current.sellNFTaddress, current.sellNFTid);
      } else {
        $q.notify('You are not in whitelist yet, contact us please.');
      }
    };
    let init = (provider) => {
      if (!provider) provider = window.ethereum;
      if (provider && provider.isMetaMask && provider.selectedAddress) {
        const web3 = new Web3(provider);
        // const myContract = new web3.eth.Contract(ABI_N, address_N); //nft 只有approve时调用
        const myContract = new web3.eth.Contract(ABI, address); //dnft

        current.account = provider.selectedAddress;
        current.network = provider.chainId;
        current.myContract = myContract;

        // let gState = useStorage('cache');
        // let dNFTs = JSON.parse(gState.value).dnfts;

        checkIsOwner();

        api
          .get('boughters?uad=' + provider.selectedAddress)
          .then(async (res) => {
            let data = res.data.data;
            let dNFTids = [...new Set(data.map((dnft) => dnft.dNFTid))];
            current.mydnftids = dNFTids;
            refreshAccountDetails(dNFTids);
          });
      }
    };
    let WalletInit = async () => {
      //判断页面是否安装Metamask
      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum;
        //禁止自动刷新，metamask要求写的
        ethereum.autoRefreshOnNetworkChange = false;

        try {
          //第一次链接Metamask
          const accounts = await ethereum.enable();
          init();
          // console.log(accounts);
          // //初始化Provider
          // const provider = window['ethereum'];
          // console.log(provider);
          // //获取网络ID
          // console.log(provider.chainId);
          // //实例化Web3
          // const web3 = new Web3(provider);
          // console.log(web3);
          // // //导入abi文件
          // // const abi = require("./contract.abi.json")
          // // //定义合约地址
          // // const address = "0x439b911d6423255a515d9762e966985d206cc177"
          // //实例化合约
          // window.myContract = new web3.eth.Contract(ABI, address);
          // console.log(window.myContract);
          // window.defaultAccount = accounts[0].toLowerCase();
          // console.log(window.defaultAccount);
          // current.myContract = window.myContract;
          // current.account = window.defaultAccount;
          // current.myContract = window.myContract;

          ethereum.on('accountsChanged', function (accounts) {
            console.log('accountsChanged:' + accounts);
            current.account = accounts.length ? accounts[0] : accounts;
            init();
          });
          ethereum.on('networkChanged', function (networkVersion) {
            console.log('networkChanged:' + networkVersion);
            current.network = networkVersion;
            init();
          });
        } catch (e) {
          console.log('link error', e);
        }
      } else {
        console.log('没有metamask');
        alert(
          'MetaMask not found, please intall it from browser extensions store first.'
        );
      }
    };
    let newWalletInit = async () => {
      const provider = await detectEthereumProvider();
      // debugger;
      if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        // initialize your app
        // await provider.enable();//之前的激活方式
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        }); //根据官方文档新的激活方式
        const account = accounts[0];
        init(provider);
        provider.on('accountsChanged', function (accounts) {
          console.log('accountsChanged:' + accounts);
          current.account = accounts[0];
          init(provider);
        });
        provider.on('networkChanged', function (networkVersion) {
          console.log('networkChanged:' + networkVersion);
          current.network = networkVersion;
          init(provider);
        });
      } else {
        $q.notify('Please install MetaMask!');
      }
    };
    function countToWei(number = 1) {
      return Web3.utils.toWei((number * 0.001).toString());
    }
    function weiToCount(amount) {
      return Web3.utils.fromWei(amount);
    }

    let test = async () => {
      // testXML();
      // approve(address, 5); //已成功 A2
      // await wrapNFT(address_N, 4);
      // await dNFTbuyer(1);
      // let value = countToWei(1);
      // console.log(value, weiToCount(value), countToWei(weiToCount(value)));
      // await idTodNFT(2);
      // unClaimOf(2, current.account);
      // claim(2);
      // balanceOf(current.account);
      // getPastEvents();
      // takeNFT(1);
      // setArtist("0xb808261924a86047368af6bc7bb91a737c668d31")
      // artistWhiteList('0xb808261924a86047368af6bc7bb91a737c668d31');
      // owner();
      // fundNFT()
    };
    // function testXML() {
    //   let url = 'http://localhost:3006/noauth/filoli/comments';
    //   let post = new XMLHttpRequest();
    //   post.open('POST', url, true);
    //   post.setRequestHeader('Content-type', 'application/json');
    //   let obj = { a: 'bb' };
    //   post.send(JSON.stringify(obj));
    // }
    function checkIsOwner() {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .owner()
          .call()
          .then(function (result) {
            console.log('owner is: ' + JSON.stringify(result));
            current.isOwner =
              result === Web3.utils.toChecksumAddress(current.account);
            // debugger;
            resolve(result);
          })
          .catch((e) => console.log(e));
      });
    }
    function balanceOf(userAddress) {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .balanceOf(userAddress)
          .call()
          .then(function (result) {
            console.log('balance: ' + JSON.stringify(result));
            resolve(result);
          })
          .catch((e) => console.log(e));
      });
    }
    //检查艺术家ad是否在白名单中
    async function addWhitelist(userAddress) {
      if (!userAddress) return $q.notify('Must input user address.');
      let isin = await artistWhiteList(userAddress);
      debugger;
      if (!isin) {
        setArtist(userAddress);
      } else {
        $q.notify('aleady in whitelist');
      }
    }
    function artistWhiteList(artistAddress) {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .artistWhiteList(artistAddress)
          .call()
          .then(function (result) {
            console.log('is in whitelist? ' + JSON.stringify(result));
            resolve(result);
          });
      });
    }
    //设置地址为艺术家白名单
    function setArtist(artistAddress) {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .setArtist(artistAddress, true)
          .send({ from: current.account })
          .then(function (result) {
            console.log('set artist: ' + JSON.stringify(result));
            resolve(result);
          });
      });
    }
    function takeNFT(dNFTid) {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .takeNFT(dNFTid)
          .send({ from: current.account })
          .then(function (result) {
            console.log('take out dNFT: ' + JSON.stringify(result));
            resolve(result);
            let t = {
              blockHash:
                '0xb517afd2cd7238ed0484e9590b3b06bfe7322c9d2f122c6635b23b520098c6fe',
              blockNumber: 23869503,
              contractAddress: null,
              cumulativeGasUsed: 1937537,
              from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              gasUsed: 104119,
              logsBloom:
                '0x04000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002000000000000000000000210000000000000000000000000008000000000000000000000000000000000000000000000000020000000000000000000800000080000200000000000010000000000000000000000000000000000000000000000000000000000000000000000000020000000080000000000100000000000000000000000000000000000000001000000002000000000000000000000000000000000000000000800000000028000010000000000000000000000000000000000000008000000000000000000000',
              status: true,
              to: '0x4667fbc2c61fb2370f8314b356924e01fe2e1a6e',
              transactionHash:
                '0xaa6363e7b3f52ed52cd4ae40c52834bf45c534022e299f06042f1da9999a4620',
              transactionIndex: 10,
              events: {
                0: {
                  address: '0x227897e07508229AA6F794D39681428351447201',
                  blockHash:
                    '0xb517afd2cd7238ed0484e9590b3b06bfe7322c9d2f122c6635b23b520098c6fe',
                  blockNumber: 23869503,
                  logIndex: 39,
                  removed: false,
                  transactionHash:
                    '0xaa6363e7b3f52ed52cd4ae40c52834bf45c534022e299f06042f1da9999a4620',
                  transactionIndex: 10,
                  transactionLogIndex: '0x0',
                  type: 'mined',
                  id: 'log_896413db',
                  returnValues: {},
                  signature: null,
                  raw: {
                    data: '0x',
                    topics: [
                      '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                      '0x0000000000000000000000004667fbc2c61fb2370f8314b356924e01fe2e1a6e',
                      '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                      '0x0000000000000000000000000000000000000000000000000000000000000002',
                    ],
                  },
                },
                1: {
                  address: '0x227897e07508229AA6F794D39681428351447201',
                  blockHash:
                    '0xb517afd2cd7238ed0484e9590b3b06bfe7322c9d2f122c6635b23b520098c6fe',
                  blockNumber: 23869503,
                  logIndex: 40,
                  removed: false,
                  transactionHash:
                    '0xaa6363e7b3f52ed52cd4ae40c52834bf45c534022e299f06042f1da9999a4620',
                  transactionIndex: 10,
                  transactionLogIndex: '0x1',
                  type: 'mined',
                  id: 'log_de252134',
                  returnValues: {},
                  signature: null,
                  raw: {
                    data: '0x',
                    topics: [
                      '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                      '0x0000000000000000000000004667fbc2c61fb2370f8314b356924e01fe2e1a6e',
                      '0x0000000000000000000000000000000000000000000000000000000000000000',
                      '0x0000000000000000000000000000000000000000000000000000000000000002',
                    ],
                  },
                },
                2: {
                  address: '0x227897e07508229AA6F794D39681428351447201',
                  blockHash:
                    '0xb517afd2cd7238ed0484e9590b3b06bfe7322c9d2f122c6635b23b520098c6fe',
                  blockNumber: 23869503,
                  logIndex: 41,
                  removed: false,
                  transactionHash:
                    '0xaa6363e7b3f52ed52cd4ae40c52834bf45c534022e299f06042f1da9999a4620',
                  transactionIndex: 10,
                  transactionLogIndex: '0x2',
                  type: 'mined',
                  id: 'log_1ce8c052',
                  returnValues: {},
                  signature: null,
                  raw: {
                    data: '0x',
                    topics: [
                      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                      '0x0000000000000000000000004667fbc2c61fb2370f8314b356924e01fe2e1a6e',
                      '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                      '0x0000000000000000000000000000000000000000000000000000000000000002',
                    ],
                  },
                },
              },
            };
          })
          .catch((e) => console.log(e));
      });
    }
    function getPastEvents(eventName = 'NewNFTwraped') {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract
          .getPastEvents(eventName, { fromBlock: 0, toBlock: 'latest' })
          .then(function (result) {
            console.log('events: ' + JSON.stringify(result));
            resolve(result);
            let events = [
              {
                address: '0x4667fbC2C61fb2370F8314b356924E01Fe2e1A6e',
                blockHash:
                  '0xa0cc7d75b7e549c8ec6ac8d81d180886fedeb42d0eca34cff9420a8559a88b51',
                blockNumber: 23861142,
                logIndex: 3,
                removed: false,
                transactionHash:
                  '0xd7b90e62e5585eece2113b672e3787e1bd0d2c53a024f84ea0bc79c0354f0dcf',
                transactionIndex: 1,
                transactionLogIndex: '0x3',
                type: 'mined',
                id: 'log_cdb2d4d0',
                returnValues: {
                  0: '0x227897e07508229AA6F794D39681428351447201',
                  1: '2',
                  2: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                  NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
                  NFTid: '2',
                  Principal: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                },
                event: 'NewNFTwraped',
                signature:
                  '0x4958f28e48c3d79a95eee5a92db2dd8f218fce330b02d862233214f605baadd1',
                raw: {
                  data: '0x',
                  topics: [
                    '0x4958f28e48c3d79a95eee5a92db2dd8f218fce330b02d862233214f605baadd1',
                    '0x000000000000000000000000227897e07508229aa6f794d39681428351447201',
                    '0x0000000000000000000000000000000000000000000000000000000000000002',
                    '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                  ],
                },
              },
            ];

            let NFTlist = events.map((res) => res.returnValues);
          })
          .catch((e) => console.log(e));
      });
    }
    function approve(address, tokenId) {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .approve(address, tokenId)
          .send({ from: current.account })
          .then(function (result) {
            console.log('approve: ' + JSON.stringify(result));
            let comments = {
              //  调用approve('0x4F403512972058aC424A05d2460D03b54E70c0e8', 1);
              // result = {
              //   approve: {
              //     blockHash:
              //       '0xd5553e50a289a08038555ba628374e61dd17cbdcb5d9b8b0e3110000d8cac311',
              //     blockNumber: 23847212,
              //     contractAddress: null,
              //     cumulativeGasUsed: 4434492,
              //     from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              //     gasUsed: 50500,
              //     logsBloom:
              //       '0x00000000000000000000000000000000000002000000000000000000000000000000001000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000001400040000000000000000000000000000000000000000000000000000000080000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000800000000048000010000000000000000000000000000000000000000000000000000000000000',
              //     status: true,
              //     to: '0x227897e07508229aa6f794d39681428351447201',
              //     transactionHash:
              //       '0x7ac55ea6ad2ab256c9c4184affd48149469cf3ef2c7d12bbcf1c8c9aa6181850',
              //     transactionIndex: 12,
              //     events: {
              //       Approval: {
              //         address: '0x227897e07508229AA6F794D39681428351447201',
              //         blockHash:
              //           '0xd5553e50a289a08038555ba628374e61dd17cbdcb5d9b8b0e3110000d8cac311',
              //         blockNumber: 23847212,
              //         logIndex: 20,
              //         removed: false,
              //         transactionHash:
              //           '0x7ac55ea6ad2ab256c9c4184affd48149469cf3ef2c7d12bbcf1c8c9aa6181850',
              //         transactionIndex: 12,
              //         transactionLogIndex: '0x0',
              //         type: 'mined',
              //         id: 'log_aa354b07',
              //         returnValues: {
              //           0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //           1: '0x4F403512972058aC424A05d2460D03b54E70c0e8',
              //           2: '1',
              //           owner: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //           approved: '0x4F403512972058aC424A05d2460D03b54E70c0e8',
              //           tokenId: '1',
              //         },
              //         event: 'Approval',
              //         signature:
              //           '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
              //         raw: {
              //           data: '0x',
              //           topics: [
              //             '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
              //             '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              //             '0x0000000000000000000000004f403512972058ac424a05d2460d03b54e70c0e8',
              //             '0x0000000000000000000000000000000000000000000000000000000000000001',
              //           ],
              //         },
              //       },
              //     },
              //   },
              // }
            };
            let t = {
              blockHash:
                '0x17eb40a79c8c88efb16594c4e1548ce9f8e1e4e7d75e7e83e1883a4432a08bb1',
              blockNumber: 23878109,
              contractAddress: null,
              cumulativeGasUsed: 124860,
              from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              gasUsed: 50500,
              logsBloom:
                '0x00000000000000000080000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000010200000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000080000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000002000000000000000000000000002000000000001000000000000000000000000000000000000000008000000000800000000008000010000000000000000000000000000000000000000000000000000000000000',
              status: true,
              to: '0x227897e07508229aa6f794d39681428351447201',
              transactionHash:
                '0xf64c04af10e22e4c4a0dc0e4e2d48b3124d0e9d9e45f5a38abf78b38249a76ae',
              transactionIndex: 1,
              events: {
                Approval: {
                  address: '0x227897e07508229AA6F794D39681428351447201',
                  blockHash:
                    '0x17eb40a79c8c88efb16594c4e1548ce9f8e1e4e7d75e7e83e1883a4432a08bb1',
                  blockNumber: 23878109,
                  logIndex: 4,
                  removed: false,
                  transactionHash:
                    '0xf64c04af10e22e4c4a0dc0e4e2d48b3124d0e9d9e45f5a38abf78b38249a76ae',
                  transactionIndex: 1,
                  transactionLogIndex: '0x0',
                  type: 'mined',
                  id: 'log_de8790e1',
                  returnValues: {
                    0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    1: '0xD49091863732A03901e46074127Fd04e15080572',
                    2: '4',
                    owner: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    approved: '0xD49091863732A03901e46074127Fd04e15080572',
                    tokenId: '4',
                  },
                  event: 'Approval',
                  signature:
                    '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                  raw: {
                    data: '0x',
                    topics: [
                      '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                      '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                      '0x000000000000000000000000d49091863732a03901e46074127fd04e15080572',
                      '0x0000000000000000000000000000000000000000000000000000000000000004',
                    ],
                  },
                },
              },
            };

            resolve(result);
          })
          .catch((e) => console.log(e));
      });
    }
    function wrapNFT(contractAd, NFTid) {
      $q.loading.show({
        message: 'Please wait a few seconds...',
      });
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .wrap(contractAd, parseInt(NFTid))
          .send({ from: current.account })
          .then(function (result) {
            console.log('dNFT: ' + JSON.stringify(result));
            $q.loading.hide();
            $q.notify('dnft wrapped.');
            $store.commit('example/setNftIdApproved', '');
            let dnftUrl = `/nft/${contractAd}/${NFTid}/${result.events.TransferSingle.returnValues.id}`;
            current.sellShow = false;
            current.sellNFTid = '';
            router.push(dnftUrl);

            resolve(result);
            let dNFT = {
              // blockHash:
              //   '0x0b4047b7ff0774219a56b8d507b7568991794bf185bd702b5ec663df738242c5',
              // blockNumber: 23848436,
              // contractAddress: null,
              // cumulativeGasUsed: 2525872,
              // from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              // gasUsed: 223069,
              // logsBloom:
              //   '0x00000000000000000000000000000000000002000000000000000000080000000000001000000000000000000000000000000000000000000000000000242000000000000000000000000008000000000000001400040000000000000000000000000000020000000000000000000800000080000200000000000010000000000000000000000000800000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000001000000002000000000000000000000000000000000008000000800000000068000010000000000000000000000000000000000000000000000001080000000000',
              // status: true,
              // to: '0x4f403512972058ac424a05d2460d03b54e70c0e8',
              // transactionHash:
              //   '0x47f0f67ff313147a53e6c188f0f87c17a48b20a44b37e28f82be75a052002a27',
              // transactionIndex: 23,
              // events: {
              //   0: {
              //     address: '0x227897e07508229AA6F794D39681428351447201',
              //     blockHash:
              //       '0x0b4047b7ff0774219a56b8d507b7568991794bf185bd702b5ec663df738242c5',
              //     blockNumber: 23848436,
              //     logIndex: 38,
              //     removed: false,
              //     transactionHash:
              //       '0x47f0f67ff313147a53e6c188f0f87c17a48b20a44b37e28f82be75a052002a27',
              //     transactionIndex: 23,
              //     transactionLogIndex: '0x0',
              //     type: 'mined',
              //     id: 'log_0dd42fed',
              //     returnValues: {},
              //     signature: null,
              //     raw: {
              //       data: '0x',
              //       topics: [
              //         '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
              //         '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              //         '0x0000000000000000000000000000000000000000000000000000000000000000',
              //         '0x0000000000000000000000000000000000000000000000000000000000000001',
              //       ],
              //     },
              //   },
              //   1: {
              //     address: '0x227897e07508229AA6F794D39681428351447201',
              //     blockHash:
              //       '0x0b4047b7ff0774219a56b8d507b7568991794bf185bd702b5ec663df738242c5',
              //     blockNumber: 23848436,
              //     logIndex: 39,
              //     removed: false,
              //     transactionHash:
              //       '0x47f0f67ff313147a53e6c188f0f87c17a48b20a44b37e28f82be75a052002a27',
              //     transactionIndex: 23,
              //     transactionLogIndex: '0x1',
              //     type: 'mined',
              //     id: 'log_a312d323',
              //     returnValues: {},
              //     signature: null,
              //     raw: {
              //       data: '0x',
              //       topics: [
              //         '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
              //         '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              //         '0x0000000000000000000000004f403512972058ac424a05d2460d03b54e70c0e8',
              //         '0x0000000000000000000000000000000000000000000000000000000000000001',
              //       ],
              //     },
              //   },
              //   TransferSingle: {
              //     address: '0x4F403512972058aC424A05d2460D03b54E70c0e8',
              //     blockHash:
              //       '0x0b4047b7ff0774219a56b8d507b7568991794bf185bd702b5ec663df738242c5',
              //     blockNumber: 23848436,
              //     logIndex: 40,
              //     removed: false,
              //     transactionHash:
              //       '0x47f0f67ff313147a53e6c188f0f87c17a48b20a44b37e28f82be75a052002a27',
              //     transactionIndex: 23,
              //     transactionLogIndex: '0x2',
              //     type: 'mined',
              //     id: 'log_43d3103b',
              //     returnValues: {
              //       0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //       1: '0x0000000000000000000000000000000000000000',
              //       2: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //       3: '2',
              //       4: '1000000000000000000',
              //       operator: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //       from: '0x0000000000000000000000000000000000000000',
              //       to: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //       id: '2',
              //       value: '1000000000000000000',
              //     },
              //     event: 'TransferSingle',
              //     signature:
              //       '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
              //     raw: {
              //       data:
              //         '0x00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000de0b6b3a7640000',
              //       topics: [
              //         '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
              //         '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              //         '0x0000000000000000000000000000000000000000000000000000000000000000',
              //         '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              //       ],
              //     },
              //   },
              // },
            };
          })
          .catch((e) => {
            console.log(e);
            $q.loading.hide();
          });
      });
    }
    function dNFTbuyer(dNFTid, number = 1) {
      let value = Web3.utils.toWei((number * 0.001).toString());
      return new Promise((resolve, reject) => {
        current.myContract.methods
          .dNFTbuyer(dNFTid)
          .send({ from: current.account, value: countToWei(number) })
          // .send({ from: current.account })
          .then(function (result) {
            console.log('dNFT buy status: ' + JSON.stringify(result));
            resolve(result);
            let status = {
              blockHash:
                '0x954d7136bb3e8a89b71db1c2f17b029e1c6dc40eac53f18f316f332c141e8a52',
              blockNumber: 23880020,
              contractAddress: null,
              cumulativeGasUsed: 176511,
              from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              gasUsed: 51051,
              logsBloom:
                '0x00000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000040000040000000000000000000000000000020000000000000080000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000001000000000000000000000000000000000000000000008000000801000001060000000000000000000000000000000000000000000000000000000080000000000',
              status: true,
              to: '0xd49091863732a03901e46074127fd04e15080572',
              transactionHash:
                '0x08434e9057b55670e4672ea6dea418facb5939068f35597b94e594053df252ca',
              transactionIndex: 3,
              events: {
                TransferSingle: {
                  address: '0xD49091863732A03901e46074127Fd04e15080572',
                  blockHash:
                    '0x954d7136bb3e8a89b71db1c2f17b029e1c6dc40eac53f18f316f332c141e8a52',
                  blockNumber: 23880020,
                  logIndex: 3,
                  removed: false,
                  transactionHash:
                    '0x08434e9057b55670e4672ea6dea418facb5939068f35597b94e594053df252ca',
                  transactionIndex: 3,
                  transactionLogIndex: '0x0',
                  type: 'mined',
                  id: 'log_8356b559',
                  returnValues: {
                    0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    1: '0x0000000000000000000000000000000000000000',
                    2: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    3: '1',
                    4: '0',
                    operator: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    id: '1',
                    value: '0',
                  },
                  event: 'TransferSingle',
                  signature:
                    '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                  raw: {
                    data:
                      '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000',
                    topics: [
                      '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                      '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                      '0x0000000000000000000000000000000000000000000000000000000000000000',
                      '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                    ],
                  },
                },
                dNFTbought: {
                  address: '0xD49091863732A03901e46074127Fd04e15080572',
                  blockHash:
                    '0x954d7136bb3e8a89b71db1c2f17b029e1c6dc40eac53f18f316f332c141e8a52',
                  blockNumber: 23880020,
                  logIndex: 4,
                  removed: false,
                  transactionHash:
                    '0x08434e9057b55670e4672ea6dea418facb5939068f35597b94e594053df252ca',
                  transactionIndex: 3,
                  transactionLogIndex: '0x1',
                  type: 'mined',
                  id: 'log_63ffd353',
                  returnValues: {
                    0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    1: '1',
                    2: '0',
                    Buyer: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    dNFTid: '1',
                    amount: '0',
                  },
                  event: 'dNFTbought',
                  signature:
                    '0xc00a752656b181ab62fc85f0076b32528570a87bcc5aaec8c318e41508a33017',
                  raw: {
                    data:
                      '0x0000000000000000000000000000000000000000000000000000000000000000',
                    topics: [
                      '0xc00a752656b181ab62fc85f0076b32528570a87bcc5aaec8c318e41508a33017',
                      '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                      '0x0000000000000000000000000000000000000000000000000000000000000001',
                    ],
                  },
                },
              },
            };
          })
          .catch((e) => console.log(e));
      });
    }
    function idTodNFT(dNFTid) {
      return new Promise((resolve, reject) => {
        current.myContract.methods
          .idTodNFT(dNFTid)
          .call()
          .then(function (result) {
            console.log('dNFT status: ' + JSON.stringify(result));
            resolve(result);
            let dnft = {
              // 0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              // 1: '0x227897e07508229AA6F794D39681428351447201',
              // 2: '0',
              // 3: '1',
              // 4: '2',
              // 5: '1615366956',
              // 6: '0',
              // 7: false,
              // principal: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              // contractAd: '0x227897e07508229AA6F794D39681428351447201',
              // accProfitsPer_dNFT1e18: '0',
              // NFTid: '1',
              // dNFTid: '2',
              // lastBuyTimestamp: '1615366956',
              // salesRevenue: '0',
              // principalClaim: false,
            };
          })
          .catch((e) => console.log(e));
      });
    }
    function unClaimOf(dNFTid, ownerAddress) {
      return new Promise((resolve, reject) => {
        current.myContract.methods
          .unClaimOf(dNFTid, ownerAddress)
          .call({ from: current.account })
          .then(function (result) {
            console.log('dNFT claim : ' + JSON.stringify(result));
            resolve(result);
            let t = '3499999999999935';
          })
          .catch((e) => console.log(e));
      });
    }
    function claim(dNFTid) {
      $q.loading.show({
        message: 'Please wait a few seconds...',
      });
      return new Promise((resolve, reject) => {
        current.myContract.methods
          .claim(dNFTid)
          .send({ from: current.account })
          .then(function (result) {
            console.log('dNFT claim status: ' + JSON.stringify(result));
            $q.loading.hide();
            $q.notify('claim success');
            current.showAccount = false;
            resolve(result);
            let t = {};
          })
          .catch((e) => console.log(e));
      });
    }
    ///分配出售NFT的钱给各股东
    function fundNFT(dNFTid, number) {
      return new Promise((resolve, reject) => {
        current.myContract.methods
          .fundNFT(dNFTid)
          .send({
            from: current.account,
            value: Web3.utils.toWei(number.toString()),
          })
          .then(function (result) {
            debugger;
            console.log('fundNFT status: ' + JSON.stringify(result));
            resolve(result);
            let t = {};
          })
          .catch((e) => console.log(e));
      });
    }
    onMounted(() => {
      // WalletInit();
      init();
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
      confirmSell,
      address_721,
      addWhitelist,
      fundNFT,
      claim,
      showAccount,
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
.btn-sell {
  margin-right: 15px;
}
.nft-sell-card {
  padding: 50px;
}
.mydnft-card {
  text-align: center;
  padding: 50px;
  min-width: 400px;
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
</style>
