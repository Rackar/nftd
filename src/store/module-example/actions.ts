import { ActionTree } from 'vuex';
import { StateInterface, DnftObject } from '../index';
import { ExampleStateInterface } from './state';
import { api } from '../../boot/axios';

declare interface IHttpResult {
  data: {
    data: DnftObject[],
    msg: string,
    status: number
  }
  status: number,
  statusText: string
}

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  async getAllDNFTs({ state, commit }) {
    let dnfts: DnftObject[] = state.dnfts
    if (state.dnfts.length === 0) {
      const res: IHttpResult = await api.get('dnfts');
      // debugger;
      const list = res.data.data.filter((nft) => {
        return nft.image && nft.image.substr(0, 4) === 'http';
      });
      list.reverse();
      commit('setDNFTs', list)
      dnfts = list
    }
    return dnfts
    // your code
  }
};

export default actions;
