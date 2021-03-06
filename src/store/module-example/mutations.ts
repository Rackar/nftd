import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setNftIdApproved(state: ExampleStateInterface, id: string) {
    // debugger;
    state.nftIdApproved = id;
  },
  setDNFTs(state: ExampleStateInterface, dnfts: []) {
    // debugger;
    state.dnfts = dnfts;
  },
  setUserAddress(state: ExampleStateInterface, userAddress:string) {
    console.log(userAddress,' change')
    // debugger
    state.userAddress = userAddress;
  }
};

export default mutation;
