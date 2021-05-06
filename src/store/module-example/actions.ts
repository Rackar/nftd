import { ActionTree } from 'vuex';
import { StateInterface, DnftObject } from '../index';
import { ExampleStateInterface } from './state';
// import { api } from '../../boot/axios';

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  getAllDNFTs({ state }) {
    const dnfts: DnftObject[] = state.dnfts
    if (state.dnfts.length === 0) {
      // const res = await api.get('dnfts');
      // const list = res.data.data.filter((nft) => {
      //   return nft.image && nft.image.substr(0, 4) === 'http';
      // });
      // list.reverse();
      // commit('setDnfts', { dnfts: list })
      // dnfts = list
    }
    return dnfts
    // your code
  }
};

export default actions;
