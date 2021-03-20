<template>
  <q-page class="column items-center">
    <h1 class="row myh1">test NFT publish</h1>
    <div class="row"></div>

    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input outlined v-model="current.name" label="NFT Name" />
        <q-input outlined v-model="current.description" label="NFT description" />
        <q-input outlined v-model="current.image" label="NFT image path" />

        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <div>
          <q-btn label="publish" type="submit" color="primary" />
          <q-btn label="approve" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
const Web3 = require('web3');
import { useQuasar } from 'quasar';
import { defineComponent, ref, reactive } from 'vue';
import {
  ABI_721_standard,
  address,
  address_721,
  getMyAddress,
} from 'src/web3/config';
import { api } from '../../boot/axios';
export default {
  name: 'CreateNFT',
  setup() {
    const $q = useQuasar();

    const current = reactive({
      name: '',
      description: '',
      image: '',
    });
    function init() {
      const web3 = new Web3(window.ethereum);
      const myContract = new web3.eth.Contract(ABI_721_standard, address_721); //nft
      return myContract;
    }

    async function onSubmit() {
      let myContract = init();
      let myAddress = await getMyAddress();
      let tokenURI = 'ss';

      return new Promise(async (resolve, reject) => {
        let index = await myContract.methods.totalSupply().call();
        index = parseInt(index) + 1;
        myContract.methods
          .awardItem(
            myAddress,
            'http://localhost:3006/noauth/filoli/nfts?id=' + index
          )
          .send({
            from: myAddress,
          })
          .then(async function (result) {
            let res = result.events.Transfer.returnValues;
            if (res.tokenId != index) {
              console.log('NFT入库tokenURI id矛盾');
              return;
            }
            let nft = {
              name: current.name,
              description: current.description,
              image: current.image,
              nftid: index,
              contractAd: address_721,
            };

            console.log('NFT status: ' + JSON.stringify(result));
            $q.notify('Create success. Now approve.');
            let s = await api.post('nfts', { nft });
            if (s) {
              // debugger;
              console.log(s);
              approve(myContract, address, index, myAddress);
            }
            let t = {
              blockHash:
                '0x9b936520f7208764840441d35206350fdb4dd2472396809d21d69f453b495c24',
              blockNumber: 23973315,
              contractAddress: null,
              cumulativeGasUsed: 170271,
              from: '0x65d17d3dc59b5ce3d4ce010eb1719882b3f10490',
              gasUsed: 170271,
              logsBloom:
                '0x00000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000020000000000000000000800000080000200000000000010000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001040000002000000000000000000000000000000000000000000800000000028000000000000000000000000000000000000000000000000000000000000000000',
              status: true,
              to: '0x227897e07508229aa6f794d39681428351447201',
              transactionHash:
                '0xb298813cdf2b62f761114eb9ad7a9997213f0182107a7425eac11989b140c209',
              transactionIndex: 0,
              events: {
                Transfer: {
                  address: '0x227897e07508229AA6F794D39681428351447201',
                  blockHash:
                    '0x9b936520f7208764840441d35206350fdb4dd2472396809d21d69f453b495c24',
                  blockNumber: 23973315,
                  logIndex: 0,
                  removed: false,
                  transactionHash:
                    '0xb298813cdf2b62f761114eb9ad7a9997213f0182107a7425eac11989b140c209',
                  transactionIndex: 0,
                  transactionLogIndex: '0x0',
                  type: 'mined',
                  id: 'log_fddc49a8',
                  returnValues: {
                    0: '0x0000000000000000000000000000000000000000',
                    1: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    2: '8',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    tokenId: '8',
                  },
                  event: 'Transfer',
                  signature:
                    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                  raw: {
                    data: '0x',
                    topics: [
                      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                      '0x0000000000000000000000000000000000000000000000000000000000000000',
                      '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                      '0x0000000000000000000000000000000000000000000000000000000000000008',
                    ],
                  },
                },
              },
            };

            resolve(result);
          })
          .catch((e) => {
            console.log(e);
          });
      });
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'You need to accept the license and terms first',
      });
    }

    function approve(myContract, address, tokenId, myAddress) {
      return new Promise((resolve, reject) => {
        console.log(current);
        myContract.methods
          .approve(address, tokenId)
          .send({ from: myAddress })
          .then(function (result) {
            console.log('approve: ' + JSON.stringify(result));
            $q.notify('New NFT id is ' + tokenId + ', please copy it to sell.');
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
    return {
      current,
      onSubmit,
    };
  },
};
</script>
<style>
.myh1 {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1rem;
  letter-spacing: -0.01562em;
}
</style>
