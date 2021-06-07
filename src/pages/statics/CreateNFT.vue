<template>
  <q-page class="column items-center">
    <h1 class="row myh1">test NFT publish</h1>
    <div class="row"></div>

    <div class="q-pa-md" style="max-width: 500px; min-width: 400px">
      <q-form @submit="onSubmit2" class="q-gutter-md">
        <q-input outlined v-model="current.name" label="NFT Name" />
        <q-input
          outlined
          type="textarea"
          v-model="current.description"
          label="NFT description"
        />
        <q-input
          outlined
          v-model="current.image"
          label="NFT image path"
          :rules="[
            (val) =>
              (val && val.substr(0, 4) === 'http') ||
              'Image path start with http/https',
          ]"
        />
        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
        <q-input outlined v-model="current.artistName" label="Artist Name" />
        <q-input
          outlined
          v-model="current.artistInfo"
          label="Artist Information"
        />
        <div>
          <q-btn label="publish" type="submit" color="primary">
            <q-inner-loading :showing="current.loading">
              <q-spinner color="primary" size="3em" :thickness="2" />
            </q-inner-loading>
          </q-btn>
          <!-- <q-btn label="approve" color="primary" /> -->
        </div>
        <div v-if="current.nftid">
          Approved NFT id:
          <span style="color: red">{{ current.nftid }}</span>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
const Web3 = require('web3');
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { awardItem, approve2 } from '../../web3/nftMethods';
import {
  address_DNFT,
  ABI_DNFT,
  address_NFT,
  ABI_NFT,
  ABI_DLOLI,
  address_DLOLI,
} from '../../web3/contract';
import { defineComponent, ref, reactive, computed } from 'vue';
import { web3instance } from '../../web3/getWeb3';
import {
  ABI_721_standard,
  address,
  address_721,
  getMyAddress,
} from 'src/web3/config';
import { api, base } from '../../boot/axios';

export default {
  name: 'CreateNFT',
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const current = reactive({
      name: '',
      description: '',
      image: '',
      artistName: '',
      loading: false,
      nftid: computed({
        get: () => $store.state.example.nftIdApproved,
        set: (val) => {
          $store.commit('example/setNftIdApproved', val);
        },
      }),
    });

    async function onSubmit2() {
      // debugger;
      let myAddress = await getMyAddress();
      // let myAddress = web3instance.account;
      let nftDetail = {
        name: current.name,
        description: current.description,
        image: current.image,
        artistName: current.artistName,
        artistInfo: current.artistInfo,
      };

      current.loading = true;
      try {
        const index = await awardItem(myAddress, nftDetail);
        nftDetail.nftid = index;
        nftDetail.contractAd = address_NFT;
        let s = await api.post('nfts', { nft: nftDetail });
        if (s) {
          $q.notify('Creating successes. Now approving.');
          // debugger;
          console.log(s);
          let res2 = await approve2(index, myAddress);
          console.log('approve: ' + JSON.stringify(res2));
          $q.notify('New NFT id is ' + index + ', please copy it to sell.');
          current.nftid = index;
        }
      } catch (error) {
        console.log(error);
      } finally {
        current.loading = false;
      }
    }

    return {
      current,
      onSubmit2,
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
