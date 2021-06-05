import { DnftObject } from '../index';
export interface ExampleStateInterface {
  prop: boolean;
  nftIdApproved: string;
  dnfts: DnftObject[];
  userAddress:string;
}

function state(): ExampleStateInterface {
  const resut: ExampleStateInterface = {
    prop: false,
    nftIdApproved: '',
    dnfts: [],
    userAddress:''
  }
  return resut
};

export default state;
