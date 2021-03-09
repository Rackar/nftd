<template>
  <span v-if="!current.account" @click="connect" class="connect">Connect Wallet</span>
  <span v-else>{{current.account}}</span>
  <button @click="test">test</button>
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
} from 'vue';
const Web3 = require('web3');
import { ABI, address } from '../web3/config';

export default defineComponent({
  name: 'ConnectWallet',
  props: {},
  setup(props) {
    function connect() {
      WalletInit();
    }
    let current = reactive({
      account: '',
      network: '',
      myContract: {},
    });
    let init = () => {
      if (
        window.ethereum &&
        window.ethereum.isMetaMask &&
        window.ethereum.selectedAddress
      ) {
        const web3 = new Web3(window.ethereum);
        const myContract = new web3.eth.Contract(ABI, address);
        current.account = window.ethereum.selectedAddress;
        current.network = window.ethereum.chainId;
        current.myContract = myContract;
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
    let test = async () => {
      await wrapNFT('0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490', 184467440737);
      // await dNFTbuyer(1);
    };
    function wrapNFT(contractAd, NFTid) {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .wrap(contractAd, NFTid)
          .send({ from: current.account })
          .then(function (result) {
            console.log('dNFT: ' + JSON.stringify(result));
            resolve(result);
          })
          .catch((e) => console.log(e));
      });
    }
    function dNFTbuyer(dNFTid) {
      return new Promise((resolve, reject) => {
        current.myContract.methods
          .dNFTbuyer(dNFTid)
          .send()
          .then(function (result) {
            console.log('dNFT buy status: ' + JSON.stringify(result));
            resolve(result);
          })
          .catch((e) => console.log(e));
      });
    }
    onMounted(() => {
      // WalletInit();
    });
    return {
      connect,
      current,
      test,
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
</style>
