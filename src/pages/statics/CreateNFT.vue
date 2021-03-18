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
import { ABI_721_standard, address_721, getMyAddress } from 'src/web3/config';

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
          .then(function (result) {
            let res = result.events.Transfer.returnValues;
            if (res.tokenId != index) console.log('NFT入库tokenURI id矛盾');
            debugger;
            console.log('NFT status: ' + JSON.stringify(result));
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
            $q.notify('success');
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
