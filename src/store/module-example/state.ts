import { DnftObject } from '../index';
export interface ExampleStateInterface {
  prop: boolean;
  nftIdApproved: string;
  dnfts: DnftObject[];
}

function state(): ExampleStateInterface {
  const resut: ExampleStateInterface = {
    prop: false,
    nftIdApproved: '',
    dnfts: []
  }
  return resut
};

export default state;
