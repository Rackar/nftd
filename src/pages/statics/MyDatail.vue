<template>
  <div class="row">
    <div class="col">
      <h5>Sold:</h5>
      <div>
        <div class="money">
          {{ current.myOwnTotalClaim.toString().substr(0, 7) }}
          {{ $store.state.example.coinName }} (${{
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
                >{{ Math.round(dnft.price * 1000) / 1000 }}
                {{ $store.state.example.coinName }}</q-item-label
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
    </div>
    <div class="col">
      <h5>Bought:</h5>
      <div>
        <div class="money">
          {{ current.myTotalClaim.toString().substr(0, 7) }}
          {{ $store.state.example.coinName }} (${{
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
                >{{ Math.round(dnft.price * 1000) / 1000 }}
                {{ $store.state.example.coinName }}</q-item-label
              >
              <q-item-label
                caption
                lines="1"
                v-if="dnftidCanGetLoli(dnft.dNFTid)"
                >{{ dnft.loliCanClaim }}</q-item-label
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
    </div>
  </div>
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
export default {};
</script>

<style></style>
