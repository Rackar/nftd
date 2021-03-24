import { MutationTree } from 'vuex';
import { ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  setNftIdApproved(state: ExampleStateInterface, id: string) {
    state.nftIdApproved = id;
  }
};

export default mutation;
