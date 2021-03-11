<template>
  <span v-if="!current.account" @click="connect" class="connect">Connect Wallet</span>
  <span v-else>
    <span>{{current.account}}</span>
    <button @click="test">test</button>
  </span>
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
import { ABI, address, ABI_N, address_N } from '../web3/config';

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
        const myContract = new web3.eth.Contract(ABI, address); //dnft
        // const myContract = new web3.eth.Contract(ABI_N, address_N); //nft
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
      // await wrapNFT(address_N, 2);
      // await dNFTbuyer(2);
      // await idTodNFT(2);
      // unClaimOf(2, current.account);
      // claim(2);
      // balanceOf(current.account);
      // approve(address, 2); //已成功 A2
      getPastEvents();
    };
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
            // let t = {
            //   blockHash:
            //     '0xe7d6831bc2f91bab52eef5a054e43f55aec6fe2744f98888daef227ce94e982d',
            //   blockNumber: 23861082,
            //   contractAddress: null,
            //   cumulativeGasUsed: 328124,
            //   from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
            //   gasUsed: 35500,
            //   logsBloom:
            //     '0x04000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002000000000000000000000210000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000080000000000100000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000800000000008000010000000000000000000000000000000000000008000000000000000000000',
            //   status: true,
            //   to: '0x227897e07508229aa6f794d39681428351447201',
            //   transactionHash:
            //     '0x63b9f60582db977fc0137f349ed93a668ea705fe00741eeac6b63fa514414e20',
            //   transactionIndex: 5,
            //   events: {
            //     Approval: {
            //       address: '0x227897e07508229AA6F794D39681428351447201',
            //       blockHash:
            //         '0xe7d6831bc2f91bab52eef5a054e43f55aec6fe2744f98888daef227ce94e982d',
            //       blockNumber: 23861082,
            //       logIndex: 10,
            //       removed: false,
            //       transactionHash:
            //         '0x63b9f60582db977fc0137f349ed93a668ea705fe00741eeac6b63fa514414e20',
            //       transactionIndex: 5,
            //       transactionLogIndex: '0x0',
            //       type: 'mined',
            //       id: 'log_f50b7f24',
            //       returnValues: {
            //         0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
            //         1: '0x4667fbC2C61fb2370F8314b356924E01Fe2e1A6e',
            //         2: '2',
            //         owner: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
            //         approved: '0x4667fbC2C61fb2370F8314b356924E01Fe2e1A6e',
            //         tokenId: '2',
            //       },
            //       event: 'Approval',
            //       signature:
            //         '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            //       raw: {
            //         data: '0x',
            //         topics: [
            //           '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            //           '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
            //           '0x0000000000000000000000004667fbc2c61fb2370f8314b356924e01fe2e1a6e',
            //           '0x0000000000000000000000000000000000000000000000000000000000000002',
            //         ],
            //       },
            //     },
            //   },
            // };
            resolve(result);
          })
          .catch((e) => console.log(e));
      });
    }
    function wrapNFT(contractAd, NFTid) {
      return new Promise((resolve, reject) => {
        console.log(current);
        current.myContract.methods
          .wrap(contractAd, NFTid)
          .send({ from: current.account })
          .then(function (result) {
            console.log('dNFT: ' + JSON.stringify(result));
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
          .catch((e) => console.log(e));
      });
    }
    function dNFTbuyer(dNFTid) {
      return new Promise((resolve, reject) => {
        current.myContract.methods
          .dNFTbuyer(dNFTid)
          .send({ from: current.account, value: Web3.utils.toWei('0.3') })
          .then(function (result) {
            console.log('dNFT buy status: ' + JSON.stringify(result));
            resolve(result);
            let status = {
              // blockHash:
              //   '0xd1b68fde8c5639223c6bd1f5efb097caaa74c354f9cf379e97991835151a64c4',
              // blockNumber: 23849764,
              // contractAddress: null,
              // cumulativeGasUsed: 3059266,
              // from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              // gasUsed: 100385,
              // logsBloom:
              //   '0x00000000000000000000000000000000000002000000000000000000080000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000800000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000008000000800000000020000000000000000000000000000000000000000000000000000001080000000000',
              // status: true,
              // to: '0x4f403512972058ac424a05d2460d03b54e70c0e8',
              // transactionHash:
              //   '0x6772092f570315a862e351202b0acd128bc9770f76fe661727dfa204714803e8',
              // transactionIndex: 25,
              // events: {
              //   TransferSingle: {
              //     address: '0x4F403512972058aC424A05d2460D03b54E70c0e8',
              //     blockHash:
              //       '0xd1b68fde8c5639223c6bd1f5efb097caaa74c354f9cf379e97991835151a64c4',
              //     blockNumber: 23849764,
              //     logIndex: 41,
              //     removed: false,
              //     transactionHash:
              //       '0x6772092f570315a862e351202b0acd128bc9770f76fe661727dfa204714803e8',
              //     transactionIndex: 25,
              //     transactionLogIndex: '0x0',
              //     type: 'mined',
              //     id: 'log_869a90da',
              //     returnValues: {
              //       0: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //       1: '0x0000000000000000000000000000000000000000',
              //       2: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //       3: '2',
              //       4: '300000000000000000000',
              //       operator: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //       from: '0x0000000000000000000000000000000000000000',
              //       to: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
              //       id: '2',
              //       value: '300000000000000000000',
              //     },
              //     event: 'TransferSingle',
              //     signature:
              //       '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
              //     raw: {
              //       data:
              //         '0x000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000001043561a8829300000',
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
          .send({ from: current.account })
          .then(function (result) {
            console.log('dNFT claim status: ' + JSON.stringify(result));
            resolve(result);
            let t = {
              // blockHash:
              //   '0xf7f5bf4195e0164b07f8803e3e380cac03e4dafa71526ffc35cf9009a1b3b967',
              // blockNumber: 23848853,
              // contractAddress: null,
              // cumulativeGasUsed: 2078903,
              // from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              // gasUsed: 29348,
              // logsBloom:
              //   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
              // status: true,
              // to: '0x4f403512972058ac424a05d2460d03b54e70c0e8',
              // transactionHash:
              //   '0xc8a40f8c6aa9f15763f96053242ba2840eb91ce21ac25936105c5b6ed90e1182',
              // transactionIndex: 9,
              // events: {},
            };
          })
          .catch((e) => console.log(e));
      });
    }
    function claim(dNFTid) {
      return new Promise((resolve, reject) => {
        current.myContract.methods
          .claim(dNFTid)
          .send({ from: current.account })
          .then(function (result) {
            console.log('dNFT claim status: ' + JSON.stringify(result));
            resolve(result);
            let t = {
              // blockHash:
              //   '0x0dfc4ec01194c8edbda423d14efdde11d0b8a6312207f25f7693b96725f38c27',
              // blockNumber: 23848872,
              // contractAddress: null,
              // cumulativeGasUsed: 3475155,
              // from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              // gasUsed: 33946,
              // logsBloom:
              //   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
              // status: true,
              // to: '0x4f403512972058ac424a05d2460d03b54e70c0e8',
              // transactionHash:
              //   '0xe95c3942d7c6e2969e81a1db29607956dc5657b5cf24aba61cc955b1289dcc1c',
              // transactionIndex: 14,
              // events: {},
            };
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
