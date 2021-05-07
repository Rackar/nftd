import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setNftIdApproved(state: ExampleStateInterface, id: string) {
    state.nftIdApproved = id;
  },
  setDNFTs(state: ExampleStateInterface, dnfts: []) {
    // debugger;
    state.dnfts = dnfts;
  }
};

export default mutation;
