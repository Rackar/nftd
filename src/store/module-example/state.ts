import { DnftObject } from '../index';
export interface ExampleStateInterface {
  prop: boolean;
  nftIdApproved: string;
  dnfts: DnftObject[];
  userAddress: string;
  coinName: string;
}

function state(): ExampleStateInterface {
  const resut: ExampleStateInterface = {
    prop: false,
    nftIdApproved: '',
    dnfts: [],
    userAddress: '',
    coinName: 'BNB'
  }
  return resut
};

export default state;
